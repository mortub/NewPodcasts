
import React from 'react';
//store related
import { RootStoreContext, RootStoreProvider } from './android/src/contexts/RootStoreContext';
import { rootStore } from './android/src/stores/RootStore';
//navigation
import MainNavigation from './android/src/navigation/MainNavigation';



const App = () => {
  
  return (
    <RootStoreProvider rootStore={rootStore}>
      <MainNavigation />
    </RootStoreProvider>
  );
};

export default App;
