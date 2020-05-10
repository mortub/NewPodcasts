import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';

const AddToListIcon = ({ track,fromMyListScreen}) => {
    //the local store of the user's list
    const { myListStore } = useRootStore();
    //to control the icon that is shown
    const [added, setAdded] = useState(false);

    useEffect(()=>{
      if(myListStore.checkIsTrackOnList(track) === true){
        setAdded(true);
      }else{
        setAdded(false);
      }
    },[myListStore.myList])

    var showAddOrDeleteFromList = added ? (
        <Icon name='minuscircle' size={30} style={{ paddingLeft: 20 }}
            onPress={() => {
                 //deleting the episode from my list
                 myListStore.DeleteTrack(track); 
                 setAdded(false); 

            }} />
    ) : (
            <Icon name='pluscircle' size={30} style={{ paddingLeft: 20 }}
                onPress={() => {
                    //adding the episode to my list
                    myListStore.addTrack(track);    
                    setAdded(true);                               
                }} />
        )

        var show = fromMyListScreen? (
            <Icon name='minuscircle' size={30} style={{ paddingLeft: 20 }}
            onPress={() => {
                //adding the episode to my list
                myListStore.DeleteTrack(track);  
                setAdded(false);         
            }} />
        ):(
           showAddOrDeleteFromList 
        )

    return (
        <>
            {show}
        </>
    )
};

export default observer(AddToListIcon);
