import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { Styles } from '../../theme/Styles';

//component for the search icon
const SearchIcon = ()=>{
    return(
        <Icon name="search1" size={30} color={Styles.secondColor} style={{paddingTop: 10, paddingLeft: 10}}/>
    )
};

export default SearchIcon;
