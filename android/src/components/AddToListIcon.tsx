import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage, {showMessage} from "react-native-flash-message";
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';


const AddToListIcon =({track})=>{
    const { myListStore } = useRootStore();
    const [added, setAdded] = useState(false);

     const showAddedFunc=()=>{
        //when adding to list, let the user know
        showMessage({
        message: "Added to list",
        type: "success",
        backgroundColor: '#FFE4E1',
        color: 'black',
        }); 
    }

    var showAddedToList = added?(
        <FlashMessage ref={showAddedFunc()} position='center' />
    ):(
        undefined
    )

    return (
        <>
        {showAddedToList}
        <Icon name='pluscircle' size={30} style={{ paddingLeft: 50 }}
        
        onPress={() => {
            setAdded(true);
            setTimeout(function () {
                setAdded(false);
            }, 600);      
            //adding the episode to my list
            myListStore.addTrack(track);
        }}
    />
    </>
    )
};

export default AddToListIcon;
