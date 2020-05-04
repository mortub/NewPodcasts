import React from 'react';
import { View, Text,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import { durationFormat } from '../utils/Calculations';


//represents a podcast episode
const Episode = ({ items,podcastName }) => {
    const { playerStore } = useRootStore();
   
    var show = items.map(item => {
        var track = {
            id: item.id,
            url: item.enclosures[0].url,
            title: item.title,
            artwork: item.itunes.image,
            artist: podcastName,
            description: item.description,
        }
        var showNowPlaying = 
            playerStore.currentTrack? (
                playerStore.currentTrack.id === track.id ?
                    <Text style={{ fontSize: 12, paddingLeft: 10, paddingTop: 20, color: 'green' }}>now playing</Text>
                    :
                    undefined
            ) : (
                 undefined
            )

        return (
            <View style={Styles.buttonStyle} key={item.id}>
                <View style={Styles.container}>
                    <ImageBackground source={{ uri: item.itunes.image }} style={Styles.episodeImage} />
                    <Text style={{ flexShrink: 1, paddingLeft: 5 }}>{item.title}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={{ paddingTop: 10 }}> {durationFormat(item.itunes.duration)}</Text>
                    <Tooltip popover={<Text>added to list</Text>}>
                        <Icon name='pluscircle' size={30} style={{ paddingLeft: 50 }} />
                    </Tooltip>                   
                    <Icon name='caretright' size={30} onPress={() => {
                            playerStore.pause();
                            playerStore.reset();
                            playerStore.add(track);
                            playerStore.play();
                        }
                        } style={{ paddingLeft: 110 }} />
                     {showNowPlaying}                                      
                </View>
            </View>
        )
    });

    return (
        <View>
            {show}
        </View>
    )
}

export default observer(Episode);