import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';
import { Styles } from '../theme/Styles';


//represents the reserved podcast episodes of a user
const MyList = ({ route }) =>{
    //the local store of the user's list
    const { myListStore } = useRootStore();
    //the list to render
    const [list ,setList ] = useState([]);
    //a constant to tell the <Episode /> what page he is on
    const fromMyListScreen=true;

    useEffect(()=>{
        showEpisodes();
    },[myListStore.myList])
    
    const showEpisodes = async() =>{
        setList(myListStore.GetAllTracks()) 
    }
    var showList= list.length !== 0 ?(
        list.map((track)=>{
            return <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen}/> 
        })
    ):(
        <Text style={Styles.podcastTitle} >Nothing on the list</Text>
    )

    return (
        <ScrollView>
            {showList}
            <BottomGap />
        </ScrollView>
    )
}

export default observer(MyList);