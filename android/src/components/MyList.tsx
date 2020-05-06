import React from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';
import { Styles } from '../theme/Styles';


//represents the reserved podcast episodes of a user
const MyList = ({ route }) =>{
    const { myListStore } = useRootStore();

    const show = () =>{
        if(myListStore.myList.length === 0){
            return <Text style={{fontFamily:'Lobster-Regular'}} >Nothing on the list</Text>
        }
        else{
            return myListStore.myList.map((track)=>{          
                return <Episode track={track} key={track.id}/>        
            })
        }
      
    }
    

    return (
        <ScrollView>
            {show()}
            <BottomGap />
        </ScrollView>
    )
}

export default observer(MyList);