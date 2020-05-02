import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
//Components
import SearchResults from '../components/SearchResults';
import Episode from '../components/Episode';
import Home from '../components/Home';
import Subscriptors from '../components/Subscriptors';
import MyList from '../components/MyList';
import CarouselComponent from '../components/CarouselComponent';
import TrackPlayerComponent from '../components/TrackPlayerComponent';
import EpisodesView from '../components/EpisodesView';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

const MainNavigation = () => {
     //a navigation system
   const Tab = createBottomTabNavigator();
   const HomeStack = createStackNavigator();
   const SubStack = createStackNavigator();
   const MyListStack = createStackNavigator();

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
  const SubStackScreen = () => {
    return (
      <SubStack.Navigator>
        <SubStack.Screen name="Subscriptors" component={Subscriptors} />
      </SubStack.Navigator>
    )
  };

  const MyListStackScreen = () => {
    return (
      <MyListStack.Navigator>
        <MyListStack.Screen name="MyList" component={MyList} options={()=>({
         title:'My List'})
         }/>
      </MyListStack.Navigator>
    )
  };

    return (
      <>
      
        <NavigationContainer>
         
        
        <Tab.Navigator
        tabBarOptions= {{
          showLabel:false,
          activeTintColor: 'blue',
          inactiveTintColor: 'grey',
          
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if(route.name === 'Home'){
                return <Icon name="home" size={30}  />;
              }
              if(route.name === 'Subscriptors'){
                return <Icon name="hearto" size={30} />;
              }
              if(route.name === 'MyList'){
                return <Icon name="menu-fold" size={30}  />;
              }
            },
           
          })}
         >          
        
          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen name='Subscriptors' component={SubStackScreen} />
          <Tab.Screen name='MyList' component={MyListStackScreen} options={()=>({
           title:'My List'})
          }/>
        </Tab.Navigator>  
        <View style={{position: 'absolute',
  bottom:60}}>
          <TrackPlayerComponent /> 
          </View>
      </NavigationContainer>
      
      </>
    )
};

export default MainNavigation;