import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import PodcastItem from '../atoms/PodcastItem';
import BottomGap from '../atoms/BottomGap';
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';

//represents the podcasts that the user is subscribed to
const Subscibers = ({ navigation }) =>{
    //the local store of the user's subscribers list
    const { subStore } = useRootStore();
    //the list to render
    const [list ,setList ] = useState([]);

    const showAllSubs = async ()=>{
        //gets the locallist ofsubscribers
        setList(subStore.GetAllSubs()) 
    }
       
    useEffect(() => {
       showAllSubs();
    }, [subStore.subscribers])
    //function for child: when pressingon podcast, navigate to its episodesview
    const navigateToEpisodesView = (sub)=>{
        console.log('from subscribers, show rssurl', sub.rssUrl)
        navigation.navigate('EpisodesView',{
            rssUrl:sub.rssUrl
         });       
    }
    //show the list of subscribers
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