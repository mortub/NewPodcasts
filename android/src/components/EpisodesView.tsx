import React from 'react';
import { ScrollView, Text, ImageBackground } from 'react-native';
//components
import Episode from './Episode';
import { Styles } from '../theme/Styles';

const EpisodesView = ({ route, navigation }) =>{
    return (
        <ScrollView>
            <Text style={{fontSize:20 , paddingTop:20,paddingBottom:20}}>{route.params.rss.title}</Text>
            <ImageBackground source={{ uri: route.params.rss.itunes.image }} style={Styles.bigEpisodeImage} />
            <Text style={{ paddingTop:20,paddingBottom:20}}>{route.params.rss.description}</Text>   
            <Episode items={route.params.rss.items} podcastName={route.params.rss.title} />   
        </ScrollView>
    )
};

export default EpisodesView;