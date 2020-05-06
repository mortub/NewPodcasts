import React, { useState } from 'react';
import { ScrollView, Text, ImageBackground, SectionList} from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { Styles } from '../theme/Styles';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';

//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) =>{
    const { cachingStore } = useRootStore();

    const [podcast, setPodcast] = useState({
        title:'',
        image: undefined,
        description: '',
    })

    cachingStore.peek(route.params.rss.title)
        .then((value) => {
            //if there aren't episodes saved in cache, set it
            if (!value) {
                setPodcast({
                    title: route.params.rss.title,
                    image: route.params.rss.itunes.image,
                    description: route.params.rss.description,
                });
                cachingStore.set(podcast);
            }
            else {
                cachingStore.get(route.params.rss.title)
                .then((pod)=>{
                    setPodcast({
                        title: pod.title,
                        image: pod.image,
                        description: pod.description,
                    });
                })              
            }
        });

        const showEpisodes = ()=>{
            return route.params.rss.items.map(item => {
                var track = {
                    id: item.id,
                    url: item.enclosures[0].url,
                    title: item.title,
                    artwork: item.itunes.image,
                    artist: podcast.title,
                    description: item.description,
                    duration: item.itunes.duration,
                }
               return (
                    <Episode track={track} key={track.id} />
               );
            })          
        }

    return (
        <ScrollView>
            <Text style={{fontSize:20 , paddingTop:20,paddingBottom:20}}>{podcast.title}</Text>
            <ImageBackground source={{ uri:podcast.image }} style={Styles.bigEpisodeImage} />
            <Text style={{ paddingTop:20,paddingBottom:20}}>{podcast.description}</Text>           
            {showEpisodes()}
           <BottomGap />
        </ScrollView >
    )
};

export default observer(EpisodesView);