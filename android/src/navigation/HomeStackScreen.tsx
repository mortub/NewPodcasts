import React, { Suspense } from 'react';
import { Text } from 'react-native';
//Components
// import SearchResults from '../components/cells/SearchResults';
// import Home from '../components/cells/Home';
// import MyList from '../components/cells/MyList';
// import EpisodesView from '../components/cells/EpisodesView';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
   //lazy loading
   const SearchResults = React.lazy(() => import('../components/cells/SearchResults'));
   const Home = React.lazy(() => import('../components/cells/Home'));
   const MyList = React.lazy(() => import('../components/cells/MyList'));
   const EpisodesView = React.lazy(() => import('../components/cells/EpisodesView'));
    return (
      <Suspense fallback={<Text>Loading...</Text>}>     
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="MyList" component={MyList} options={{ title: 'My List' }} />
        <HomeStack.Screen name="Search" component={SearchResults} options={{ title: 'Search Podcasts' }} />
        <HomeStack.Screen name="EpisodesView" component={EpisodesView} options={{ title: 'Episodes' }} />       
      </HomeStack.Navigator>
      </Suspense> 
    )
  };

  export default HomeStackScreen;