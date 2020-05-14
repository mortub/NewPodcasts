import React from 'react';
import { Text } from 'react-native';
//components
import { Styles } from '../../theme/Styles';

//component for the title of a podcast
const PodcastTitle = ({title}) => {
    return (
        <Text style={Styles.podcastTitle}>{title}</Text>
    )
};

export default PodcastTitle;