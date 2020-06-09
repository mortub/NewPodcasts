import React, { useEffect, Suspense } from 'react';
import { TouchableOpacity, Text } from 'react-native';
//components
import { Styles } from '../../theme/Styles';
import { useRootStore } from '../../contexts/RootStoreContext';
import FlatListEpisode from '../molecules/FlatListEpisodes';
import { fetchPopularPodcasts, fetchPodcasts, fetchPodcast } from '../../Api/Fetches';
//represents the Home screen of the app
const Home = ({ navigation }) =>{
    //lazy loading
    const SearchIcon = React.lazy(() => import('../atoms/SearchIcon'));
    //the local store of the user's list
    const { myListStore } = useRootStore();
    //the local store of the subscribers list
    const { subStore } = useRootStore();

    useEffect(() => {
        //fetch bothe lists from db
        myListStore.fromDbToLocalList()
        subStore.fromDbToLocalSubsList()     
    },)
    // fetchPopularPodcasts()
    // .then((popularPodcasts)=>{
    //     popularPodcasts.map((pod)=>{
    //         if(pod.name === 'The Joe Rogan Experience'){
    //             console.log(pod.name)
    //             fetchPodcasts(pod.name)
    //             .then((res)=>{
    //                 console.log(res)
    //             })
    //         }
          
    //     })
    // });
    // fetchPodcast('http://joeroganexp.joerogan.libsynpro.com/rss/page/2')
    //         .then((res)=>{
    //             console.log(res)
    // })
    
  
    return (
        <>
        {/* <FlatListEpisode /> */}
        <TouchableOpacity 
        style={Styles.clickableOpacity}
         onPress ={()=> navigation.push('Search')} >
                <Suspense fallback={<Text>Loading...</Text>}>
                    <SearchIcon />
                </Suspense>           
            <Text style={Styles.searchInHomeText}>Search Podcasts</Text>
        </TouchableOpacity>
       
        </>
    )
}

export default Home;