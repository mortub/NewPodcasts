import React from 'react';
import { View, Text,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage from "react-native-flash-message";
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import { durationFormat } from '../utils/Calculations';
import AddToListIcon from './AddToListIcon';


//represents a podcast episode
const Episode = ({ track , fromMyListScreen}) => {

    const { playerStore } = useRootStore();
    const { myListStore } = useRootStore();

   //shows a text of 'now playing' if the current track is chosen
    var showNowPlaying = 
    playerStore.currentTrack? (
        playerStore.currentTrack.id === track.id ?
            <Text style={{ fontSize: 12, paddingLeft: 10, paddingTop: 20, color: 'green' }}>now playing</Text>
            :
            undefined
    ) : (
         undefined
    );

    return (
        <View style={Styles.buttonStyle} key={track.id}>
            <View style={Styles.container}>
                <ImageBackground source={{ uri: track.artwork }} style={Styles.episodeImage} />
                <Text style={{ flexShrink: 1, paddingLeft: 5 ,}}>{track.title}</Text>            
            </View>
            <View style={Styles.container}>
                <Text style={{ paddingTop: 10 }}> {durationFormat(track.duration)}</Text>
                <AddToListIcon track={track} fromMyListScreen={fromMyListScreen}/>
                <Icon name='caretright' size={30} onPress={() => {
                    playerStore.pause();
                    playerStore.reset();
                    playerStore.add(track);
                    playerStore.play();

                    myListStore.DeleteTrack(track);
                }
                } style={{ paddingLeft: 90 }} />
                {showNowPlaying}
            </View>
        </View>
    )
}

export default observer(Episode);
