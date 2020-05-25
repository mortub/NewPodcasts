import React from 'react';
import {TouchableOpacity} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../../contexts/RootStoreContext';

//component for the press forward icon
const PlayForwardIcon = ()=>{
    //the local player store
    const { playerStore } = useRootStore();
 return(
    <TouchableOpacity style={{paddingLeft:10, paddingBottom:5}}
    onPress={()=>{
       playerStore.skip10SecondsForward();
   }}>
       <Icon color='black' name='forward' size={20} />
   </TouchableOpacity>
 )
};

export default observer(PlayForwardIcon);