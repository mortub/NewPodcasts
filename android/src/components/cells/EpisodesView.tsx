import React, { useState, useEffect, Suspense } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
//import { useRootStore } from '../../contexts/RootStoreContext';
import BottomGap from '../atoms/BottomGap';
import { fetchPodcast } from '../../Api/Fetches';

//shows all of the episodes of a certain podcast
const EpisodesView = ({ route, navigation }) => {
    //lazy loading
    const Episode = React.lazy(() => import('../molecules/Episode'));
    const PodcastTitle = React.lazy(() => import('../atoms/PodcastTitle'));
    const PodcastImage = React.lazy(() => import('../atoms/PodcastImage'));
    const SubscribeIcon = React.lazy(() => import('../atoms/SubscribeIcon'));

    //to know when fetching is done to show the podcast info
    const [isFetching, setFetching] = useState(true)
    //a constant to tell the <Episode /> what page he is on
    const fromMyListScreen = false;
    // const { cachingStore } = useRootStore();

    // const [podcast, setPodcast] = useState({
    //     title:'',
    //     image: undefined,
    //     description: '',
    // })
    //keeps the info from the fetching
    const [rss, setRss] = useState({});

    useEffect(() => {
        //setFetching(true);
        async function fetching() {
            //fetch podcast
            await fetchPodcast(route.params.rssUrl)
                .then((rss) => {
                    setRss(rss);

                })
                .then(() => {
                    setFetching(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        };


        if (isFetching) {
            fetching();
        }

    }, [route.params.rssUrl])

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
        <ScrollView >
            <Suspense fallback={<Text>Loading...</Text>}>
                {showTitle}
                {showImage}
                {showSubIcon}
                {showDescription}
                {isFetching ? (
                    <Text>Loading...</Text>
                ) : (
                        rss.items.map(item => {
                            var track = {
                                id: item.id,
                                url: item.enclosures[0].url,
                                title: item.title,
                                artwork: item.itunes.image,
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
            </Suspense>
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
