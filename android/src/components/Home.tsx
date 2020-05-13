import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
//components
import SearchIcon from './SearchIcon';
import { Styles } from '../theme/Styles';
import { useRootStore } from '../contexts/RootStoreContext';

//represents the Home screen of the app
const Home = ({ navigation }) =>{
    //the local store of the user's list
    const { myListStore } = useRootStore();
    const { subStore } = useRootStore();

    useEffect(() => {
        myListStore.fromDbToLocalList()
        subStore.fromDbToLocalSubsList()     
    },)

  
    return (
        <>
        <TouchableOpacity 
        style={Styles.clickableOpacity}
         onPress ={()=> navigation.push('Search')} >
            <SearchIcon />
            <Text style={Styles.searchInHomeText}>Search Podcasts</Text>
        </TouchableOpacity>
       
        </>
    )
}

export default Home;