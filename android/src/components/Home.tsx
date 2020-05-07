import React from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
//components
import SearchIcon from './SearchIcon';
import { Styles } from '../theme/Styles';

//represents the Home screen of the app
const Home = ({ navigation }) =>{
   
    return (
        <TouchableOpacity 
        style={{
            flexDirection: 'row', 
            marginTop:10,
            paddingBottom:20,
            backgroundColor:'#FFE4E1',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#FFE4E1'
        }}
         onPress ={()=> navigation.push('Search')} >
            <SearchIcon />
            <Text style={Styles.searchInHomeText}>Search Podcasts</Text>
        </TouchableOpacity>
    )
}

export default Home;