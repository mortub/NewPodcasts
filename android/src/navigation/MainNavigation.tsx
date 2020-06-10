import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';
//Components
import { Styles } from '../theme/Styles';
import TrackPlayerComponent from '../components/molecules/TrackPlayerComponent';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SubStackScreen from './SubStackScreen';
import MyListStackScreen from './MyListStackScreen';




const MainNavigation = () => {
  //a navigation system
  const Tab = createBottomTabNavigator();
  

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            activeTintColor:Styles.mainColor,
            inactiveTintColor:'black'

          }}        
        >

          <Tab.Screen name='Home' component={HomeStackScreen} options={{
            tabBarIcon: ({color}) => <Icon name="home" size={30} color={color}/>
          }}/>
          <Tab.Screen name='Subscribers' component={SubStackScreen} options={{
            tabBarIcon: ({color}) => <Icon name="hearto" size={30} color={color} />
          }} />
          <Tab.Screen name='MyList' component={MyListStackScreen} options={{
            tabBarIcon: ({color}) => <Icon name="menu-fold" size={30} color={color}/>
          }}/>
          
        </Tab.Navigator>
        <View style={{
          position:'absolute',
          bottom: 50,
        }}>
          <View style={{backgroundColor:Styles.mainColor}}>
          <TrackPlayerComponent />
          </View>         
        </View>
      </NavigationContainer>
    </>
  )
};

export default MainNavigation;