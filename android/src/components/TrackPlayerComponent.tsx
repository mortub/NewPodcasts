import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';


//represents the reserved podcast episodes of a user
const TrackPlayerComponent = () =>{
    TrackPlayer.setupPlayer().then(() => {
        // The player is ready to be used
    });
}

export default TrackPlayerComponent;