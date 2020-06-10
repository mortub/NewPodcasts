import React from 'react';
import {TouchableOpacity} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';

//component for the press forward icon
const PlayBackwardIcon = ()=>{
    //the local player store
    const { playerStore } = useRootStore();
 return(
    <TouchableOpacity style={{paddingLeft:10, paddingBottom:5}}
    onPress={()=>{
        playerStore.skip10SecondsBack();
   }}>
       <Icon color='black' name='banckward' size={20} color={Styles.secondColor}/>
   </TouchableOpacity>
 )
};

export default observer(PlayBackwardIcon);