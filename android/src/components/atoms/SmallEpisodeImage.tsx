import React from 'react';
import { ImageBackground }from 'react-native';
import { observer } from "mobx-react";
//components
import { Styles } from '../../theme/Styles';

//component for the image on the episode
const SmallEpisodeImage = ({track}) =>{
    return (
        <ImageBackground source={{ uri: track.artwork }} style={Styles.episodeImage} />
    )
};

export default observer(SmallEpisodeImage);