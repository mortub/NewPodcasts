import React, { useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
//components
import CarouselComponent from './CarouselComponent';
import { fetchPodcasts, fetchPodcast} from '../Api/Fetches';

//showing the search results of the podcasts
const SearchResults = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
    };

   
    const callFetchPodcasts = () =>{
        fetchPodcasts(search)
        .then((podcasts)=>{
            setSearchResults(podcasts);
        })
    };

    const pressOnAPodcast = async (id,carouselItems) =>{
        carouselItems.map((pod)=>{
            if(pod.id === id){
                fetchPodcast(pod)
               .then((rss)=>{
                navigation.navigate('EpisodesView',{
                    rss:rss
                 });          
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
                onSubmitEditing={callFetchPodcasts}
            />
            {returnCarousel}
        </ScrollView >
    );
};

export default SearchResults;