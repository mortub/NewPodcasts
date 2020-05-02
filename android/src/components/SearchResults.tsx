import React, { useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as rssParser from 'react-native-rss-parser';
//components
import CarouselComponent from './CarouselComponent';

//showing the search results of the podcasts
const SearchResults = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
    };

    //fetches all Podcasts that were searched
    const fetchPodcasts = () => {
        var toSearch = search.replace('', '+');
        return fetch(`https://itunes.apple.com/search?term=${toSearch}`)
            .then((response) => response.json())
            .then((json) => {
                var tmpSearchResults = [];
                json.results.map(pod => {
                    //returning only podcasts from API
                    if (pod.kind === 'podcast') {
                        var podcastInfo = {
                            id: pod.trackId,
                            image: pod.artworkUrl600,
                            name: pod.artistName,
                            url: pod.feedUrl,
                        }
                        tmpSearchResults.push(podcastInfo);
                    }
                });
                setSearchResults(tmpSearchResults);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const pressOnAPodcast = async (id,carouselItems) => {
        carouselItems.map((pod) => {    
          if(pod.id === id){
            fetch(pod.url)
              .then((response) =>{         
               return response.text()        
              })
              .then((data)=>{
                return rssParser.parse(data)
              })
              .then((rss)=>{
                    //TODO: pass rss to episodesView :probaly need navigation
                navigation.navigate('EpisodesView',{
                    rss:rss
                });         
              })
              .catch(err => {
                console.log(err);
              })
          }
        })
    };

    var returnCarousel = searchResults.length > 0 ? <CarouselComponent results={searchResults} pressOnAPodcast={pressOnAPodcast}/>
     : (
     <View >
         <Text style={{ textAlign: 'center', justifyContent:'space-between'}}>
            No Results
         </Text>
     </View>);
    return (
        <ScrollView >
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                onSubmitEditing={fetchPodcasts}
            />
            {returnCarousel}
        </ScrollView >
    );
};

export default SearchResults;