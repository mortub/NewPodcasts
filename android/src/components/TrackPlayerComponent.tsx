import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { observer } from "mobx-react";
//components
import PlayerService from '../services/PlayerService';
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import PlayerSlider from '../components/PlayerSlider';



//a track player
const TrackPlayerComponent = () => {
  //using the global player
  const { playerStore } = useRootStore();

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  playerStore.getDuration().then(
    (duration) => {
      setDuration(duration)
    }
  );
  playerStore.getPosition().then(
    (position) => {
      setPosition(position)
    }
  );

  //the icon that needs to be shown: play/pause
  var showIcon = playerStore.isPlaying ?
  (
    <TouchableOpacity onPress={() =>{
      playerStore.pause();
      playerStore.getPosition().then(
        (position) => {
          setPosition(position)
        }
      );
    } }>
      <Icon name='pausecircle' size={30} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => playerStore.play()}>
      <Icon name='caretright' size={30} />
    </TouchableOpacity>
  )
  return (
    <View style={Styles.navBarLeftButton}>
      {showIcon}
      <PlayerSlider position={position} duration={duration} />       
     
    </View>
  );
};

export default observer(TrackPlayerComponent);

