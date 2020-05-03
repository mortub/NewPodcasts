import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Tooltip } from 'react-native-elements';
//components
import { useRootStore } from '../contexts/RootStoreContext';


//represents a podcast episode
const Episode = ({ items }) => {
    const { playerStore } = useRootStore();

    //TODO: move calculation to another place
    const durationFormat = (totalSeconds) => {
        if (totalSeconds.includes(':')) {
            var a = totalSeconds.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds;
            if (a.length > 2) {
                seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            }
            else {
                seconds = (+a[0]) * 60 + (+a[1]);
            }

            return new Date(seconds * 1000).toISOString().substr(11, 8);
        }
        return new Date(totalSeconds * 1000).toISOString().substr(11, 8);
    };

    var show = items.map(item => {
        var track = {
            id: item.id,
            url: item.enclosures[0].url,
            title: item.title,
            artwork: item.itunes.image,
            artist: item.itunes.authors,
        }
        var nowPlaying = playerStore.isPlaying ? (
            <Text>Now Playing</Text>
        ) : (
                undefined
            )
        return (
            <View style={styles.buttonStyle} key={item.id}>
                <View style={styles.container}>
                    <ImageBackground source={{ uri: item.itunes.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, overflow: 'hidden', flexDirection: 'row', }} />
                    <Text style={{ flexShrink: 1, paddingLeft: 5 }}>{item.title}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ paddingTop: 10 }}> {durationFormat(item.itunes.duration)}</Text>
                    <Tooltip popover={<Text>added to list</Text>}>
                        <Icon name='pluscircle' size={30} style={{ paddingLeft: 100 }} />
                    </Tooltip>
                    <Icon name='caretright' size={30} onPress={() => {
                            playerStore.pause();
                            playerStore.reset();
                            playerStore.add(track);
                            playerStore.play();
                        }
                        } style={{ paddingLeft: 100 }} />
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

//TODO: move styles to the styles in another file
export default Episode;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
        flexDirection: 'row',

    },
    textStyle: {
        alignSelf: 'center',
        color: 'teal',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        padding: 20,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
    },
});