import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';


const SearchIcon = ()=>{
    return(
        <Icon name="search1" size={30} style={{paddingTop: 10, paddingLeft: 10}}/>
    )
};

export default SearchIcon;
