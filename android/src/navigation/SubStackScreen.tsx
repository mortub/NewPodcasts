import React, { Suspense } from 'react';
import { Text } from 'react-native';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const SubStack = createStackNavigator();

const SubStackScreen = () => {
   //lazy loading
   const Subscribers = React.lazy(() => import('../components/cells/Subscribers'));
   const EpisodesView = React.lazy(() => import('../components/cells/EpisodesView'));
    return (
      <Suspense fallback={<Text>Loading...</Text>}>  
      <SubStack.Navigator>
         <SubStack.Screen name="Subscribers" component={Subscribers} />
         <SubStack.Screen name="EpisodesView" component={EpisodesView} options={{ title: 'Episodes' }} />
      </SubStack.Navigator>
      </Suspense>
    )
  };

  export default SubStackScreen;