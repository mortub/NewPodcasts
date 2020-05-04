import React from 'react';
//Components
import MyList from '../components/MyList';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const MyListStack = createStackNavigator();

const MyListStackScreen = () => {
    return (
      <MyListStack.Navigator>
         <MyListStack.Screen name="MyList" component={MyList} options={() => ({
          title: 'My List'
        })
        } />
      </MyListStack.Navigator>
    )
  };

  export default MyListStackScreen;