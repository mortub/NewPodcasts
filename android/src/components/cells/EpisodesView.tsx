import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { observer } from "mobx-react";
//components
import BottomGap from '../atoms/BottomGap';
import { fetchPodcast } from '../../Api/Fetches';
import Episode from '../molecules/Episode';
import PodcastTitle from '../atoms/PodcastTitle';
import PodcastImage from '../atoms/PodcastImage';
import SubscribeIcon from '../atoms/SubscribeIcon';

//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) => {
    //counter beacuse onEndReachedfor is called twice, so only when even the actions are made 
    const [ count, setCount ] = useState(0)
    const [data, setData ] = useState([]);
    const [page, setPage ] = useState(1);
    //to know when fetching is done to show the podcast info
    const [isFetching, setFetching] = useState(true)
    //a constant to tell the <Episode /> what page he is on
    const fromMyListScreen = false;
    //what to do when flatlist reaches the end
    const onEndReachedFunc = ()=>{
        setCount(count + 1);
        if ((count % 2) === 0) {
            setPage(page + 1);
            setFetching(true);
        }
    }
    //to show each episode of the podcast
    const showEpisode = (item)=>{
        var track = {
            id: item.id,
            url: item.enclosures[0].url,
            title: item.title,
            artwork: item.itunes.image,
            artist: data.title,
            description: item.description,
            duration: item.itunes.duration,
            rssUrl: route.params.rssUrl,
        }
        return (                     
            <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen} />
        );
    }
    //keeps the info from the fetching
    const [rss, setRss] = useState({});
    //fetches from api
    function fetching() {           
        //fetch podcast
        return fetchPodcast(route.params.rssUrl, page)
        .then((res)=>{  
            return res;                 
        })
        .catch((err) => {
                console.log(err)
         })
    };

    useEffect(() => {     
        //fetches if loading
        if (isFetching) {       
           fetching()
           .then((res)=>{
            setData([...data,...res.items]);
            setRss(res);
            setFetching(false);
         })           
        }      
    }, [route.params.rssUrl,page])

    //podcast title
    var showTitle = isFetching ? (
        undefined
    ) : (
        <PodcastTitle title={rss.title} />
        )
    //podcast image
    var showImage = isFetching ? (
        undefined
    ) : (
        <PodcastImage image={rss.itunes.image} />
        )
    //podcast subsciption icon
    var showSubIcon = isFetching ? (
        undefined
    ) : (
        <SubscribeIcon rssUrl={route.params.rssUrl} title={rss.title} image={rss.itunes.image} />
        )
    //podcast description
    var showDescription = isFetching ? (
        undefined
    ) : (
        <Text style={{ paddingTop: 20, paddingBottom: 20 }}>{rss.description}</Text>
        )

    return (
        <SafeAreaView >
            <FlatList
                data={data}
                ListHeaderComponent={() => {
                    return (
                        <>
                            {showTitle}
                            {showImage}
                            {showSubIcon}
                            {showDescription}
                        </>
                    )
                }}
                renderItem={({ item }) => {
                   return showEpisode(item);
                }}
                bounces={false}
                keyExtractor={item => item.id}
                onEndReached={() => {
                    onEndReachedFunc();
                }}
                onEndReachedThreshold={0.7}
            />
            <BottomGap />
        </SafeAreaView >
    )
};

export default observer(EpisodesView);
