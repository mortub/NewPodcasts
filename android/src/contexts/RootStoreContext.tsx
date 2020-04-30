import React from 'react';
import RootStore from '../stores/RootStore';

const RootStoreContext = React.useContext<RootStore | null>(null);

const RootStoreProvider : React.FC<{ rootStore : RootStore}> = props =>{
    <RootStoreContext.Provider value={ props.rootStore }>
        {props.children}
    </RootStoreContext.Provider>
};

const useRootStore = () => {
    const store = React.useContext(RootStoreContext);

    if(!store){
        throw new Error('Forgot to use the RootStoreProvider');
    }

    return store;
};

export { RootStoreContext, RootStoreProvider, useRootStore }
