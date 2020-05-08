import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';
import PodcastTitle from './PodcastTitle';
import PodcastImage from './PodcastImage';
import SubscribeIcon from './SubscribeIcon';
import { fetchPodcast } from '../Api/Fetches';

// fetchPodcast(pod)
//     .then((rss) => {

//     })
//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) =>{ 
     //a constant to tell the <Episode /> what page he is on
     const fromMyListScreen = false;  
    // const { cachingStore } = useRootStore();
   
    const [podcast, setPodcast] = useState({
        title:'',
        image: undefined,
        description: '',
    })
    const [rss, setRss ] = useState();
    // //see if the information was already cached
    // cachingStore.peek(route.params.rss.title)
    //     .then((value) => {
    //         //if there aren't episodes saved in cache, set it
    //         if (!value) {
    //             setPodcast({
    //                 title: route.params.rss.title,
    //                 image: route.params.rss.itunes.image,
    //                 description: route.params.rss.description,
    //             });
    //             cachingStore.set(podcast);
    //         }
    //         else {
    //             cachingStore.get(route.params.rss.title)
    //             .then((pod)=>{
    //                 setPodcast({
    //                     title: pod.title,
    //                     image: pod.image,
    //                     description: pod.description,
    //                 });
    //             })              
    //         }
    //     });
    //fetch podcast
     fetchPodcast(route.params.rssUrl)
        .then((rss)=>{
            setRss(rss);
        })
    //show all episodes of the podcast
    const showEpisodes = () => {
        return rss.items.map(item => {
            var img = item.itunes.image ? (
                item.itunes.image
            ) : (
                    item.googleplay.image
                )
            var track = {
                id: item.id,
                url: item.enclosures[0].url,
                title: item.title,
                artwork: img,
                artist: rss.title,
                description: item.description,
                duration: item.itunes.duration,
                rssUrl: route.params.rssUrl,
            }
            return (
                <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen} />
            );
        })

    }
    var showTitle = rss?(
        <PodcastTitle title= {rss.title}/>
    ):(
        undefined
    )

    var showImage = rss? (
        <PodcastImage image={rss.itunes.image}/>
    ):(
        undefined
    )

    return (      
        <ScrollView>      
          {showTitle}
           {showImage}
           <SubscribeIcon />
            <Text style={{ paddingTop:20,paddingBottom:20}}>{podcast.description}</Text>           
            {rss? showEpisodes(): undefined}
           <BottomGap />
        </ScrollView >
    )
};

export default observer(EpisodesView);