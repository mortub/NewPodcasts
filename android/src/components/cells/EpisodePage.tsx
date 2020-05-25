import React, { Suspense } from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import BottomGap from '../atoms/BottomGap';

//component to control and show information about the current episode that is playing.
const EpisodePage = () =>{
    //lazy loading
    const PodcastTitle = React.lazy(() => import('../atoms/PodcastTitle'));
    const PodcastImage = React.lazy(() => import('../atoms/PodcastImage'));
    //the local player store
    const { playerStore } = useRootStore();

    //if there is a current track chosen, show the image, title etc..
    var showEpisode = playerStore.currentTrack ? (
        <ScrollView >
            <Suspense fallback={<Text>Loading...</Text>}>
                <PodcastTitle title={playerStore.currentTrack.artist} />
                <PodcastImage image={playerStore.currentTrack.artwork} />
            </Suspense>
            <Text style={{ paddingTop: 20, color:'white' }}>{playerStore.currentTrack.title}</Text>
            <Text style={{ paddingTop: 20, color:'white' }}>{playerStore.currentTrack.description.replace(/<\/?[^>]+>/gi, '')}</Text>
            <BottomGap />
        </ScrollView>       
    ):(
        <Text style={Styles.podcastTitle} >No Track To Display</Text>
    );

    return (
        <View>
           {showEpisode}
        </View>
    )
};

export default observer(EpisodePage);