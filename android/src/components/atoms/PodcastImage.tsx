import React from 'react';
import { ImageBackground, View } from 'react-native';
//components
import { Styles } from '../../theme/Styles';

//component for the title of a podcast
const PodcastImage = ({image}) => {
    return (
        <ImageBackground source={{ uri:image }} style={Styles.bigEpisodeImage} />   
    )
};

export default PodcastImage;