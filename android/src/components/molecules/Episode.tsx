import React, { Suspense } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import { durationFormat } from '../../utils/Calculations';
//import AddToListIcon from '../atoms/AddToListIcon';


//represents a podcast episode
const Episode = ({ track, fromMyListScreen }) => {
    //lazy loading
    const AddToListIcon = React.lazy(() => import('../atoms/AddToListIcon'));
    //the local player store
    const { playerStore } = useRootStore();
    //shows a text of 'now playing' if the current track is chosen
    var showNowPlaying =
        playerStore.currentTrack ? (
            playerStore.currentTrack.id === track.id ?
                <Text style={{ fontSize: 12, paddingTop: 15, color: 'green', paddingEnd: 5 }}>now playing</Text>
                :
                undefined
        ) : (
                undefined
            );

    return (
        <View style={Styles.buttonStyle} key={track.id}>
            <View style={Styles.container}>
                <ImageBackground source={{ uri: track.artwork }} style={Styles.episodeImage} />
                <Text style={{ paddingLeft: 40 }}>{track.title}</Text>
            </View>
            <View style={Styles.container}>
                <Text style={{ paddingTop: 10 }}> {durationFormat(track.duration)}</Text>
                <View style={{ flex: 5, flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                        <Icon name='download' size={30} style={{ flex: 1, paddingLeft: 10 }} />
                        <Suspense fallback={<Text>Loading...</Text>}>
                            <AddToListIcon track={track} fromMyListScreen={fromMyListScreen} />
                        </Suspense>
                        <Icon name='caretright' size={30} onPress={() => {
                            playerStore.pause();
                            playerStore.reset();
                            playerStore.add(track);
                            playerStore.play();
                        }
                        } style={{ flex: 1, }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {showNowPlaying}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default observer(Episode);
