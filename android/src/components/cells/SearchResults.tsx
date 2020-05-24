import React, { useState, Suspense } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
//components
//import CarouselComponent from '../molecules/CarouselComponent';
import { fetchPodcasts } from '../../Api/Fetches';
import { Styles } from '../../theme/Styles';

//showing the search results of the podcasts
const SearchResults = ({ navigation }) => {
    //lazy loading
    const CarouselComponent = React.lazy(() => import('../molecules/CarouselComponent'));
    //the search term
    const [search, setSearch] = useState('');
    //the podcasts who came up as a result of the search
    const [searchResults, setSearchResults] = useState([]);
    //every time the user presses 'enter' the search term changes
    const updateSearch = (search) => {
        setSearch(search);
    };

   //fetching all podcasts who match the search
    const callFetchPodcasts = () =>{
        fetchPodcasts(search)
        .then((podcasts)=>{
            setSearchResults(podcasts);
        })
    };

    //function sent to child - carousel. 
    //when pressing a podcast, navigate to its episodes
    const pressOnAPodcast = async (id,carouselItems) =>{
        carouselItems.map(async(pod)=>{
            if(pod.id === id){
                navigation.navigate('EpisodesView',{
                    rssUrl: pod.url
                 });                    
            }
        })
    };

   //what to show the user as a result of the search
    var returnCarousel = search !== ''?(
        searchResults.length > 0 ? 
        (
            <Suspense fallback={<Text>Loading...</Text>}>
                <CarouselComponent results={searchResults} pressOnAPodcast={pressOnAPodcast} />
            </Suspense>
        )
        : (
        <View >
           <Text style={Styles.podcastTitle} >No Results</Text>
        </View>)
    ):(
        undefined
    );
    
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