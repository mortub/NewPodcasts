
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/AntDesign';
//Components
import SearchResults from './android/src/components/SearchResults';
import Episode from './android/src/components/Episode';
import Home from './android/src/components/Home';
import Subscriptors from './android/src/components/Subscriptors';
import MyList from './android/src/components/MyList';
import CarouselComponent from './android/src/components/CarouselComponent';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const App = () => {
   //a navigation system
   const Tab = createBottomTabNavigator();
   const HomeStack = createStackNavigator();
   const SubStack = createStackNavigator();
   const MyListStack = createStackNavigator();

   const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="MyList" component={MyList} options={{title:'My List'}}/>
        <HomeStack.Screen name="Search" component={SearchResults} options={{ title: 'Search Podcasts'}} />
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
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if(route.name === 'Home'){
              return <Icon name="home" size={30} />;
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
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
