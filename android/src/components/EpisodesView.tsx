import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';
import PodcastTitle from './PodcastTitle';
import PodcastImage from './PodcastImage';

//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) =>{
    const { cachingStore } = useRootStore();
    //a constant to tell the <Episode /> what page he is on
    const fromMyListScreen = false;
    const [podcast, setPodcast] = useState({
        title:'',
        image: undefined,
        description: '',
    })
    //see if the information was already cached
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
        //show all episodes of the podcast
        const showEpisodes = ()=>{
            return route.params.rss.items.map(item => {
                var img= item.itunes.image?(
                    item.itunes.image
                ):(
                    item.googleplay.image
                )
                var track = {
                    id: item.id,
                    url: item.enclosures[0].url,
                    title: item.title,
                    artwork: img,
                    artist: podcast.title,
                    description: item.description,
                    duration: item.itunes.duration,
                }
               return (
                    <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen} />
               );
            })          
        }

    return (
        <ScrollView>
           <PodcastTitle title= {podcast.title}/>
           <PodcastImage image={podcast.image}/>
            <Text style={{ paddingTop:20,paddingBottom:20}}>{podcast.description}</Text>           
            {showEpisodes()}
           <BottomGap />
        </ScrollView >
    )
};

export default observer(EpisodesView);