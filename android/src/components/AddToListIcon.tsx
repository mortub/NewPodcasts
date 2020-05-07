import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {showMessage} from "react-native-flash-message";
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';


const AddToListIcon =({track})=>{
    const { myListStore } = useRootStore();

    return (
        <Icon name='pluscircle' size={30} style={{ paddingLeft: 50 }}
        onPress={() => {
            //when adding to list, let the user know
            showMessage({
                message: "added to list",
                type: "success",
                backgroundColor: '#FFE4E1',
                color: 'black'
            });
            //adding the episode to my list
            myListStore.addTrack(track);
        }}
    />
    )
};

export default AddToListIcon;
