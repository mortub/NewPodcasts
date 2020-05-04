import React from 'react';
//Components
import EpisodePage from '../components/EpisodePage';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const EpisodeStack = createStackNavigator();

const EpisodeStackScreen = () => {
    return (
      <EpisodeStack.Navigator>
         <EpisodeStack.Screen name="EpisodePage" component={EpisodePage} options={() => ({
          title: 'Current Episode'
        })
        } />
      </EpisodeStack.Navigator>
    )
  };

  export default EpisodeStackScreen;