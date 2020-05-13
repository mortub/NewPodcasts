import React, { useState, useEffect } from 'react';
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

//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) =>{ 
    const [isFetching, setFetching] = useState(true)
     //a constant to tell the <Episode /> what page he is on
     const fromMyListScreen = false;  
    // const { cachingStore } = useRootStore();
   
    // const [podcast, setPodcast] = useState({
    //     title:'',
    //     image: undefined,
    //     description: '',
    // })
    const [rss, setRss ] = useState({});

    useEffect(()=>{  
        async function fetching(){
            //fetch podcast
            await fetchPodcast(route.params.rssUrl)
            .then((rss) => {
                setRss(rss);
               
            })
            .then(()=>{
                setFetching(false);
            })
            .catch((err) => {
                console.log(err)
            })
        };
        if(isFetching){
            fetching(); 
        }
    },[])
  
    //show all episodes of the podcast
    const showEpisodesFunc = () => {
            return rss.items.map(item => {
                var track = {
                    id: item.id,
                    url: item.enclosures[0].url,
                    title: item.title,
                    artwork: item.itunes.image ,
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

    var showTitle = isFetching?(
        undefined     
    ) : (
        <PodcastTitle title= {rss.title}/>
    )

    var showImage = isFetching? (
        undefined
    ):(
        <PodcastImage image={rss.itunes.image}/>
    )

    var showSubIcon= isFetching? (
        undefined
    ):(
        <SubscribeIcon rssUrl={route.params.rssUrl} title={rss.title} image={rss.itunes.image}/>
    )

    var showDescription = isFetching? (
        undefined
    ):(
        <Text style={{ paddingTop:20,paddingBottom:20}}>{rss.description}</Text>     
    )

    return (      
        <ScrollView style={{ paddingLeft: 10 }}>
            {showTitle}
            {showImage}
            {showSubIcon}
            {showDescription}
            {isFetching? (
                <Text>Loading...</Text>
            ):(              
                rss.items.map(item => {
                    var track = {
                        id: item.id,
                        url: item.enclosures[0].url,
                        title: item.title,
                        artwork: item.itunes.image ,
                        artist: rss.title,
                        description: item.description,
                        duration: item.itunes.duration,
                        rssUrl: route.params.rssUrl,
                    }
                    return (
                        <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen} />
                    );
                })
            )}
            <BottomGap />
        </ScrollView >
    )
};

export default observer(EpisodesView);
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
    