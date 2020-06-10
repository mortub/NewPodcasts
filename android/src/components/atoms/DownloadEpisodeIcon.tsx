import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { Styles } from '../../theme/Styles';

//component for the 'download' icon on the episode
const DownloadEpisodeIcon = () =>{

    return (
        <Icon name='download' size={30} style={{ flex: 1, paddingLeft: 10 }} color={Styles.mainColor}/>
    )
};

export default observer(DownloadEpisodeIcon);