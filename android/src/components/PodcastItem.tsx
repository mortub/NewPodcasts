import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
//components
import { Styles } from '../theme/Styles';
import PodcastImage from './PodcastImage';
import PodcastTitle from './PodcastTitle';

const PodcastItem = ({sub, rssUrl, navigateToEpisodesView}) =>{
    //TODO: set up a constant style
    return (
        <TouchableOpacity key={rssUrl} onPress={()=>{
            navigateToEpisodesView(sub)
        }}>
            <ImageBackground style={{ width: 360, height: 50 }} source={{ uri: sub.image }}>
                <View 
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 justifyContent: 'center', alignItems: 'center' , borderWidth: 2}}>
                    <Text style={{ fontFamily:'Lobster-Regular',fontSize:20, 
                   textShadowColor:'black',textShadowRadius:50,color:'white'
                    }}>{sub.title}</Text>
                </View>
                </ImageBackground>
        </TouchableOpacity>
    )
};

export default PodcastItem;