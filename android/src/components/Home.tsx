import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
//components
import SearchIcon from './SearchIcon';
import { Styles } from '../theme/Styles';

//represents the Home screen of the app
const Home = ({ navigation }) =>{
   
    return (
        <TouchableOpacity 
        style={Styles.clickableOpacity}
         onPress ={()=> navigation.push('Search')} >
            <SearchIcon />
            <Text style={Styles.searchInHomeText}>Search Podcasts</Text>
        </TouchableOpacity>
    )
}

export default Home;