import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
//components
import { Styles } from '../theme/Styles';
import PodcastImage from './PodcastImage';
import PodcastTitle from './PodcastTitle';

const PodcastItem = ({}) =>{
    return (
        <TouchableOpacity >
            <ImageBackground style={{ width: 360, height: 50 }} source={{ uri: 'https://files.whooshkaa.com/podcasts/podcast_5817/podcast_media/f35808-healthcode_coverart_72dpi-01.jpg' }}>
                <View 
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                 justifyContent: 'center', alignItems: 'center' , borderWidth: 2}}>
                    <Text style={{ fontFamily:'Lobster-Regular',fontSize:20, 
                   textShadowColor:'black',textShadowRadius:50,color:'white'
                    }}>The Health Code</Text>
                </View>
                </ImageBackground>
        </TouchableOpacity>
    )
};

export default PodcastItem;