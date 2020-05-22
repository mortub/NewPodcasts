import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';

//an icon for adding/removing from or to the list of episodes
const AddToListIcon = ({ track,fromMyListScreen}) => {
    //the local store of the user's list
    const { myListStore } = useRootStore();
    //to control the icon that is shown
    const [added, setAdded] = useState(false);

    useEffect(()=>{
      //if the track was added, show an icon of remove, else show an icon of add
      if(myListStore.checkIsTrackOnList(track) === true){
        setAdded(true);
      }else{
        setAdded(false);
      }
    },[myListStore.myList])

    //the icon to show
    var showAddOrDeleteFromList = added ? (
        <Icon name='minuscircle' size={30} style={{  flex: 1 }}
            onPress={() => {
                 //deleting the episode from my list
                 myListStore.DeleteTrack(track); 
                 setAdded(false); 

            }} />
    ) : (
            <Icon name='pluscircle' size={30} style={{ flex: 1}}
                onPress={() => {
                    //adding the episode to my list
                    myListStore.addTrack(track);    
                    setAdded(true);                               
                }} />
        )

        //if we are on the list screen, show only the minus icon
        var show = fromMyListScreen? (
            <Icon name='minuscircle' size={30} style={{  flex: 1 }}
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
