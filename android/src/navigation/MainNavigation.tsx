import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';
//Components
import { Styles } from '../theme/Styles';
import TrackPlayerComponent from '../components/TrackPlayerComponent';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SubStackScreen from './SubStackScreen';
import MyListStackScreen from './MyListStackScreen';
import EpisodeStackScreen from './EpisodeStackScreen';



const MainNavigation = () => {
  //a navigation system
  const Tab = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            activeTintColor: 'blue',
            inactiveTintColor: 'grey',

          }}
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Home') {
                return <Icon name="home" size={30} />;
              }
              if (route.name === 'Subscriptors') {
                return <Icon name="hearto" size={30} />;
              }
              if (route.name === 'MyList') {
                return <Icon name="menu-fold" size={30} />;
              }
              if (route.name === 'EpisodeStack') {
                return <Icon name="pptfile1" size={30} />;
              }
            },

          })}
        >

          <Tab.Screen name='Home' component={HomeStackScreen} />
          <Tab.Screen name='Subscriptors' component={SubStackScreen} />
          <Tab.Screen name='MyList' component={MyListStackScreen} />
          <Tab.Screen name='EpisodeStack' component={EpisodeStackScreen} />
        </Tab.Navigator>
        <View style={{
          position:'absolute',
          bottom: 50,
        }}>
          <View style={Styles.mainColor}>
          <TrackPlayerComponent />
          </View>         
        </View>
      </NavigationContainer>
    </>
  )
};

export default MainNavigation;