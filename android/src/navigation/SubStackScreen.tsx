import React from 'react';
//Components
import Subscribers from '../components/cells/Subscribers';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const SubStack = createStackNavigator();

const SubStackScreen = () => {
    return (
      <SubStack.Navigator>
         <SubStack.Screen name="Subscribers" component={Subscribers} />
      </SubStack.Navigator>
    )
  };

  export default SubStackScreen;