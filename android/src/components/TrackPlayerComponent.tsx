import React, { useState, useRef} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';
import PlayerSlider from '../components/PlayerSlider';
import SlideBarEpisode from './SlideBarEpisode';



//a track player
const TrackPlayerComponent = () => {
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
    <TouchableOpacity  onPress={() =>{
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
  var titleShow = playerStore.getCurrentTrack()? (
    <Text ellipsizeMode='tail' numberOfLines={2}>{playerStore.getCurrentTrack().title}</Text>
  ):(
    undefined
  );
  const childRef = useRef();

  return (
    <TouchableOpacity onPress={() => childRef.current.toggleModal()}>
      <SlideBarEpisode ref={childRef}/>
      {titleShow}
      <View style={Styles.navBarLeftButton}>
        {showIcon}
        <PlayerSlider position={position} duration={duration} />
      </View>
    </TouchableOpacity>
  );
};

export default observer(TrackPlayerComponent);

