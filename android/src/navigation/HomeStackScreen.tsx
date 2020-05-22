import React from 'react';
//Components
import SearchResults from '../components/cells/SearchResults';
import Home from '../components/cells/Home';
import MyList from '../components/cells/MyList';
import EpisodesView from '../components/cells/EpisodesView';
import EpisodePage from "../components/cells/EpisodePage";
import TrackPlayerComponent from '../components/molecules/TrackPlayerComponent';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="MyList" component={MyList} options={{ title: 'My List' }} />
        <HomeStack.Screen name="Search" component={SearchResults} options={{ title: 'Search Podcasts' }} />
        <HomeStack.Screen name="EpisodesView" component={EpisodesView} options={{ title: 'Episodes' }} />       
      </HomeStack.Navigator>
    )
  };

  export default HomeStackScreen;