import React from 'react';
//Components
import Subscriptors from '../components/Subscriptors';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const SubStack = createStackNavigator();

const SubStackScreen = () => {
    return (
      <SubStack.Navigator>
         <SubStack.Screen name="Subscriptors" component={Subscriptors} />
      </SubStack.Navigator>
    )
  };

  export default SubStackScreen;