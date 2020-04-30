import React, { useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import CarouselComponent from './CarouselComponent';
import { SearchBar } from 'react-native-elements';

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
    }

    var returnCarousel = searchResults.length > 0 ? <CarouselComponent results={searchResults} />
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