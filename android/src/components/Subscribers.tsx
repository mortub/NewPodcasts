import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import PodcastItem from './PodcastItem';
import BottomGap from './BottomGap';
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';

//represents the podcasts that the user is subscribed to
const Subscibers = ({ navigation }) =>{
    //the local store of the user's subscribers list
    const { subStore } = useRootStore();
    //the list to render
    const [list ,setList ] = useState([]);

    const showAllSubs = async ()=>{
        setList(subStore.GetAllSubs()) 
    }
       
    useEffect(() => {
       showAllSubs();
    }, [subStore.subscribers])

    const navigateToEpisodesView = (sub)=>{
        navigation.navigate('EpisodesView',{
            rssUrl:sub.rssUrl
         });       
    }

    var showList= list.length !== 0 ?(
        list.map((sub)=>{
             return <PodcastItem sub={sub} key={sub.rssUrl} navigateToEpisodesView={navigateToEpisodesView}/>
        })
    ):(
        <Text style={Styles.podcastTitle} >You are not subscribed to any channel</Text>
    )
    
    
    return (
        <ScrollView>
           {showList}
            <BottomGap />
        </ScrollView>
    )
}

export default observer(Subscibers);