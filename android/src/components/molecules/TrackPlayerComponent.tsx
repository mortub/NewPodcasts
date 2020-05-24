import React, { useState, useRef, Suspense} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles';
import PlayerSlider from '../atoms/PlayerSlider';
//a track player
const TrackPlayerComponent = () => {
  //lazy loading
  const SlideBarEpisode = React.lazy(() => import('./SlideBarEpisode'));
  //the local player store
  const { playerStore } = useRootStore();
  //for extracting the duration+position from the local player
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

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
  //showing the title of the current episode
  var titleShow = playerStore.getCurrentTrack()? (
    <Text ellipsizeMode='tail' numberOfLines={2}>{playerStore.getCurrentTrack().title}</Text>
  ):(
    undefined
  );
  const childRef = useRef();

  return (
    <TouchableOpacity onPress={() => childRef.current.toggleModal()}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <SlideBarEpisode ref={childRef} />
        </Suspense>
        {titleShow}
        <View style={Styles.navBarLeftButton}>
          {showIcon}
          <PlayerSlider position={position} duration={duration} />
        </View>     
    </TouchableOpacity>
  );
};

export default observer(TrackPlayerComponent);

