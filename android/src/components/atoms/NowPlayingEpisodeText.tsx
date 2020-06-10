import React from 'react';
import { Text }from 'react-native';
import { observer } from "mobx-react";
//components
import { Styles } from '../../theme/Styles'; 

//component for the 'noe playing' on the episode that is currently playing
const NowPlayingEpisodeText = () =>{
    return (
        <Text style={{ fontSize: 12, paddingTop: 15, color:Styles.mainColor, paddingEnd: 5 }}>now playing</Text>
    )
};

export default observer(NowPlayingEpisodeText);