import React from 'react';
import { ScrollView, Text, ImageBackground } from 'react-native';
//components
import Episode from './Episode';

const EpisodesView = ({ route, navigation }) =>{
    return (
        <ScrollView>
            <Text style={{fontSize:20 }}>{route.params.rss.title}</Text>
            <ImageBackground source={{ uri: route.params.rss.itunes.image }} style={{ width: 200, height: 200 }} />
            <Text>{route.params.rss.description}</Text>   
            <Episode items={route.params.rss.items}/>   
        </ScrollView>
    )
};

export default EpisodesView;