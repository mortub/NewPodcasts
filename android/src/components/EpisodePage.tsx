import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import BottomGap from './BottomGap';
import PodcastTitle from './PodcastTitle';
import PodcastImage from './PodcastImage';

//component to control and show information about the current episode that is playing
const EpisodePage = () =>{
    const { playerStore } = useRootStore();

    //showing the icons of moving 10 sec back/forward in the current episode
    var icons = (
        <View style={{flex: 1,
            flexDirection: 'row', padding:10}}>        
            <TouchableOpacity style={{paddingLeft:10}}
             onPress={()=>{
                playerStore.skip10SecondsForward();
            }}>
                <Icon color='white' name='forward' size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingLeft:200}}
             onPress={()=>{
                playerStore.skip10SecondsBack();
            }}>
                <Icon color='white' name='banckward' size={30} />
            </TouchableOpacity>
        </View>
    );
    //if there is a current track chosen, show the image, title etc..
    var showEpisode = playerStore.currentTrack ? (
        <ScrollView >
            <PodcastTitle title={playerStore.currentTrack.artist} />
            <PodcastImage image={playerStore.currentTrack.artwork} />
            <Text style={{ paddingTop: 20, color:'white' }}>{playerStore.currentTrack.title}</Text>
            {icons}
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