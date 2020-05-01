import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { observer } from "mobx-react";
//components
import PlayerService from '../services/PlayerService';
import { useRootStore } from '../contexts/RootStoreContext';
import { Styles } from '../theme/Styles';

class PlayerSlider extends ProgressComponent{

     constructor(props) {
         super(props);
         this.state = {
            duration: 0,
            isSeeking: false,
            position : 0,
            SliderDisable : true
            }        
            
            this.props.playerStore.getDuration().then(
                (duration)=>{
                    this.setState({duration})
                  }         
              );
              this.props.playerStore.getPosition().then(
               (position)=>{            
                      this.setState({position})                  
                  }     
              );    
     }
     async updateValue(){
        await this.props.playerStore.getPosition().then(
            (position)=>{            
                   this.setState({position})                   
               }     
           );
     }
    render(){
        {this.updateValue}
        return(  
               
            <Slider 
            minimumValue          = {0}
            maximumValue          = {this.state.duration}
            thumbTintColor        = '#FFFFFF'
            minimumTrackTintColor = '#000000'
            maximumTrackTintColor = '#808080'
            step                  = {1}
            disabled              = {false}
            // onValueChange ={ val=>{
            //   TrackPlayer.pause();
            //   this.seek = val;
            //   this.setState({isSeeking:true})
            // }}
            // onSlidingComplete={ val=>{
            //   TrackPlayer.play();
            //   this.setState(()=> {
            //     TrackPlayer.seekTo(this.seek);
            //     this.position = this.seek;
            //   })
            // }}
            //value={this.position}
           style={{width: '100%'}}
          />
          
          
        )

    }
};

export default observer(PlayerSlider);

