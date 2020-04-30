import React from 'react';
import { View, Text, Button } from 'react-native';

import Player, { TrackStatus} from './playerStuff';


//represents the Home screen of the app
const Home = ({ navigation }) =>{
   
    return (
        <View>
            <Button title="Go To my list" 
            onPress ={()=> navigation.push('MyList', {name: 'hello from home page'})}  
            />
            <Button title="Go To search" 
            onPress ={()=> navigation.push('Search', {name: 'hello from home page'})}  
            />
        </View>
       
        // <Player />
        
        
    )
}

export default Home;