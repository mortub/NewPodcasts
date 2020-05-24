import React from 'react';
import { Text }from 'react-native';
import { observer } from "mobx-react";

//component for the 'noe playing' on the episode that is currently playing
const NowPlayingEpisodeText = () =>{
    return (
        <Text style={{ fontSize: 12, paddingTop: 15, color: 'green', paddingEnd: 5 }}>now playing</Text>
    )
};

export default observer(NowPlayingEpisodeText);