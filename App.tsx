
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
//store related
import { RootStoreProvider } from './android/src/contexts/RootStoreContext';
import { rootStore } from './android/src/stores/RootStore';
//navigation
import MainNavigation from './android/src/navigation/MainNavigation';
import SignUp from './android/src/components/cells/SignUp';
import { addUserIfNeeded, onGoogleButtonPress } from './android/src/utils/Auth';

const Auth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    addUserIfNeeded(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //if the user is not signed up
  if (!user) {
    return (
      <SignUp onGoogleButtonPress={onGoogleButtonPress} />
    );
  }

  //if the user is already logged in 
  return (
    <RootStoreProvider rootStore={rootStore}>
      <MainNavigation />
    </RootStoreProvider>
  );
}

const App = () => {
  return (
    <Auth />
  )
};

export default App;
