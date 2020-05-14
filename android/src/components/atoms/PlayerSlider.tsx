import React from 'react';
import Slider from '@react-native-community/slider';
import { observer } from "mobx-react";
//components
import { Styles } from '../../theme/Styles';
import { useRootStore } from '../../contexts/RootStoreContext';

//component to show the slider in the trackplayer: moves with sound
//receives the track duration+position 
const PlayerSlider = ({ position, duration }) => {
  //the local player store
    const { playerStore } = useRootStore();
    
    return (
        <Slider
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor='#FFFFFF'
            minimumTrackTintColor='#000000'
            maximumTrackTintColor='#808080'
            step={1}
            disabled={false}
            onValueChange ={ val=>{
              playerStore.seekTo(val);
            }}
            onSlidingComplete={ val=>{             
              playerStore.pause();
              
            }}
            value={position}
            style={Styles.sliderWidth}            
        /> 
    );
};

export default observer(PlayerSlider);

