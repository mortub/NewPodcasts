import React, { Suspense } from 'react';
import { Text } from 'react-native';
//Navigation
import { createStackNavigator } from '@react-navigation/stack';

const MyListStack = createStackNavigator();

const MyListStackScreen = () => {
   //lazy loading
   const MyList = React.lazy(() => import('../components/cells/MyList'));
    return (
      <Suspense fallback={<Text>Loading...</Text>}>  
      <MyListStack.Navigator>
         <MyListStack.Screen name="MyList" component={MyList} options={() => ({
          title: 'My List'
        })
        } />
      </MyListStack.Navigator>
      </Suspense>
    )
  };

  export default MyListStackScreen;