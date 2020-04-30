import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import PlayerService from '../services/PlayerService';

TrackPlayer.registerPlaybackService( () => PlayerService);

TrackPlayer.setupPlayer().then(async () => {
    await TrackPlayer.add({
        id: 'trackId',
        url: 'https://media.whooshkaa.com/show/5817/episode/623483.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        //artwork: require('./track.png')
    });
});

//a track player
class TrackPlayerComponent extends ProgressComponent  {

   constructor(props){
       super(props)
       this.state = {
            duration: 0,
            isSeeking: false,
            position : 0,
            SliderDisable : true
          }
    }
    componentDidMount(){
        TrackPlayer.getDuration().then(
          duration=>this.setState({
              duration:duration/100}),
          
        )
        TrackPlayer.getPosition().then(
          position=>this.setState({position}),
          
        )        
      }

    play() {
        TrackPlayer.play(); 
        TrackPlayer.getDuration().then(
            duration=>{
                this.setState({duration:duration}) 
                
            }       
          )

          TrackPlayer.getPosition().then(
            position=>{this.setState({position: position*100}),
            console.log(position*10)}
          )      
      }
    
    pause() {
        TrackPlayer.pause();
    };
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.play()}>
                <Icon name='caretright' size={30} />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={() => this.pause()}>
                <Icon name='pausecircle' size={30} />
            </TouchableOpacity>
                 <Slider 
              minimumValue          = {0}
              maximumValue          = {this.state.duration}
              thumbTintColor        = '#FFFFFF'
              minimumTrackTintColor = '#000000'
              maximumTrackTintColor = '#808080'
              step                  = {1}
              //disabled              = {this.state.SliderDisable}
              value={this.state.position}
            //   onValueChange ={ val=>{
            //     TrackPlayer.pause();
            //     this.seek = val;
            //     this.setState({isSeeking:true})
            //   }}
            //   onSlidingComplete={ val=>{
            //     TrackPlayer.play();
            //     this.setState(()=> {
            //       TrackPlayer.seekTo(this.seek);
            //       this.position = this.seek;
            //     })
            //   }}
             style={{width:'100%'}}
             
            />
             </View>
        );       
    }

};

export default TrackPlayerComponent;

