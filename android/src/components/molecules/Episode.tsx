import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import { durationFormat } from '../../utils/Calculations';


//represents a podcast episode
const Episode = ({ track, fromMyListScreen }) => {
    //lazy loading
    const AddToListIcon = React.lazy(() => import('../atoms/AddToListIcon'));
    const PlayEpisodeIcon = React.lazy(() => import('../atoms/PlayEpisodeIcon'));
    const DownloadEpisodeIcon = React.lazy(() => import('../atoms/DownloadEpisodeIcon'));
    const SmallEpisodeImage = React.lazy(() => import('../atoms/SmallEpisodeImage'));
    const SmallEpisodeTitle = React.lazy(() => import('../atoms/SmallEpisodeTitle'));
    const NowPlayingEpisodeText = React.lazy(() => import('../atoms/NowPlayingEpisodeText'));
    //the local player store
    const { playerStore } = useRootStore();
    //shows a text of 'now playing' if the current track is chosen
    var showNowPlaying =
        playerStore.currentTrack ? (
            playerStore.currentTrack.id === track.id ?
                <NowPlayingEpisodeText />
                :
                undefined
        ) : (
                undefined
            );

    return (
        <View style={Styles.buttonStyle} key={track.id}>
            <Suspense fallback={<Text>Loading...</Text>}>
                <View style={Styles.container}>
                    <SmallEpisodeImage track={track} />
                    <SmallEpisodeTitle track={track} />
                </View>
                <View style={Styles.container}>
                    <Text style={{ paddingTop: 10 }}> {durationFormat(track.duration)}</Text>
                    <View style={{ flex: 5, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <DownloadEpisodeIcon />
                            <AddToListIcon track={track} fromMyListScreen={fromMyListScreen} />
                            <PlayEpisodeIcon track={track} />
                        </View>
                        <View style={{ flex: 1 }}>
                            {showNowPlaying}
                        </View>
                    </View>
                </View>
            </Suspense>
        </View>
    )
}

export default observer(Episode);
