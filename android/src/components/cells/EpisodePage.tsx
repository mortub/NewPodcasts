import React from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import BottomGap from '../atoms/BottomGap';
import PodcastTitle from '../atoms/PodcastTitle';
import PodcastImage from '../atoms/PodcastImage';

//component to control and show information about the current episode that is playing.
const EpisodePage = () =>{
    //to be able to navigate from here
    //const navigation = useNavigation();
    //the local player store
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
            <TouchableOpacity 
            onPress={()=>{
            // navigation.navigate('EpisodesView',{
            //     rssUrl: playerStore.currentTrack.rssUrl
            // })
         }}
         >
                 <PodcastTitle title={playerStore.currentTrack.artist} />
            </TouchableOpacity>          
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