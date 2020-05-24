import React from 'react';
import { Text }from 'react-native';
import { observer } from "mobx-react";

//component for the title on the episode
const SmallEpisodeTitle = ({track}) =>{
    return (
        <Text style={{ marginLeft: 36, marginRight: 15 }}>{track.title}</Text>
    )
};

export default observer(SmallEpisodeTitle);