import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
//components
import { Styles } from '../../theme/Styles';

//component for showing a podcast: title+image
const PodcastItem = ({sub, rssUrl, navigateToEpisodesView}) =>{
    return (
        <TouchableOpacity key={rssUrl} onPress={()=>{
            navigateToEpisodesView(sub)
        }}>
            <ImageBackground style={Styles.podcastitemImage} source={{ uri: sub.image }}>
                <View 
                style={Styles.podcastItemView}>
                    <Text style={Styles.podcastItemText}>{sub.title}</Text>
                </View>
                </ImageBackground>
        </TouchableOpacity>
    )
};

export default PodcastItem;