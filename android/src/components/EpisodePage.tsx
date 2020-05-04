import React from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import TrackPlayerComponent from './TrackPlayerComponent';

const EpisodePage = (navigation) =>{
    const { playerStore } = useRootStore();
    var icons = (
        <View style={{flex: 1,
            flexDirection: 'row', padding:10}}>        
            <TouchableOpacity style={{paddingLeft:10}}
             onPress={()=>{
                playerStore.skip10SecondsForward();
            }}>
                <Icon name='forward' size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingLeft:300}}
             onPress={()=>{
                playerStore.skip10SecondsBack();
            }}>
                <Icon name='banckward' size={30} />
            </TouchableOpacity>

        </View>
    )

    var showEpisode = playerStore.currentTrack? (
        <ScrollView >
            <Text style={{ paddingTop: 20 }}>{playerStore.currentTrack.artist}</Text>
            <ImageBackground source={{ uri: playerStore.currentTrack.artwork }} style={Styles.bigEpisodeImage} />
            <Text style={{ paddingTop: 20 }}>{playerStore.currentTrack.title}</Text>
            {icons}
            <Text style={{ paddingTop: 20 , paddingBottom:500}}>{playerStore.currentTrack.description.replace(/<\/?[^>]+>/gi, '')}</Text>
        </ScrollView>
        
    ):(
        undefined
    )

    return (
        <View>
           {showEpisode}
        </View>
    )
};

export default observer(EpisodePage);