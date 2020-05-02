import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  ImageBackground } from 'react-native';


//represents a podcast episode
//TODO: image, trackplayer, start/pause/restart, option of 10 seconds forward and back, adding to favourites

const Episode = ({ items }) =>{

    var show = items.map(item => {
          return(
              <TouchableOpacity style={styles.buttonStyle}>
                  <View style={styles.container}> 
                      <ImageBackground source={{ uri: item.itunes.image }} style={{ width: 50, height: 50, borderRadius: 50.2, }}/>
                      <Text>{item.title}</Text>
                  </View>
              </TouchableOpacity>
          )       
    });
   
    return (
        <View>
          {show}
        </View>
    )
}

export default Episode;
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'white',
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
          padding:20,
          backgroundColor: 'white',
          marginLeft: 5,
          marginRight: 5,
          borderRadius: 100,
          marginTop:10,
          marginBottom:10,
          borderWidth: 1,
      },
  });