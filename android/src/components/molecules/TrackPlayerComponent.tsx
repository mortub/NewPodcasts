import React, { useState, useRef, useEffect, Suspense } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import PlayerSlider from '../atoms/PlayerSlider';
import SlideBarEpisode from './SlideBarEpisode';
import PlayForwardIcon from '../atoms/PlayForwardIcon';
import PlayBackwardIcon from '../atoms/PlayBackwardIcon';
import TimePassedText from '../atoms/TimePassedText';
import TimeLeftText from '../atoms/TimeLeftText';

//a track player
const TrackPlayerComponent = () => {
  //the local player store
  const { playerStore } = useRootStore();
  //for extracting the duration+position from the local player
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {

    let secTimer = setInterval(() => {
      playerStore.getPosition().then(
        (position) => {
          setPosition(position)
        }
      );
    }, 2000)

    return () => clearInterval(secTimer);

  }, [position]);



  useEffect(() => {
    //at the beginnig setting the duration+position from the local player
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

  }, [])

  //the icon that needs to be shown: play/pause
  var showIcon = playerStore.isPlaying ?
    (
      <TouchableOpacity onPress={() => {
        playerStore.pause();
        playerStore.getPosition().then(
          (position) => {
            setPosition(position)
          }
        );
      }}>
        <Icon name='pausecircle' size={30} color={Styles.secondColor}/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => {
        playerStore.play();
      }}>
        <Icon name='caretright' size={30} color={Styles.secondColor}/>
      </TouchableOpacity>
    )
  //showing the title of the current episode
  var titleShow = playerStore.getCurrentTrack() ? (
    <Text style={{color:Styles.secondColor}} ellipsizeMode='tail' numberOfLines={1}>{playerStore.getCurrentTrack().title}</Text>
  ) : (
      undefined
    );
  const childRef = useRef();

  return (
    <>
      <TouchableOpacity onPress={() => childRef.current.toggleModal()}>
        <SlideBarEpisode ref={childRef} />
        {titleShow}
        <View style={Styles.navBarLeftButton}>
          {showIcon}
          <PlayerSlider position={position} duration={duration} />
        </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TimePassedText position={position} />
        <PlayForwardIcon />
        <PlayBackwardIcon />
        <TimeLeftText duration={duration} position={position} />
      </View>
      </TouchableOpacity>
    </>
  );
};

export default observer(TrackPlayerComponent);

