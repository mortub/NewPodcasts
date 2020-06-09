import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { fetchPodcast } from '../../Api/Fetches';
import Episode from '../molecules/Episode';

const FlatListEpisode = ()=>{
    const [data, setData ] = useState();
    const [ page, setPage ] = useState(1);
    const fromMyListScreen = false;

        useEffect(()=>{
            fetchPodcast('http://joeroganexp.joerogan.libsynpro.com/rss', page)
            .then((res)=>{
                setData(res.items);
            });
            
        },[page]);

    return(
        <FlatList 
        data={data}
        renderItem={({ item }) => {
            var track = {
                id: item.id,
                url: item.enclosures[0].url,
                title: item.title,
                artwork: item.itunes.image,
                artist: data.title,
                description: item.description,
                duration: item.itunes.duration,
                rssUrl: 'http://joeroganexp.joerogan.libsynpro.com/rss/page/1',
            }
            return (
                <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen} />
            );
        }}
        keyExtractor={item => item.id}
        onEndReached={()=> setPage(page+1)}
        onEndReachedThreshold={0.5}
        />
    )

};

export default FlatListEpisode;