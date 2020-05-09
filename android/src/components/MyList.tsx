import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { observer } from "mobx-react";
//components
import Episode from './Episode';
import { useRootStore } from '../contexts/RootStoreContext';
import BottomGap from './BottomGap';
import { Styles } from '../theme/Styles';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


//represents the reserved podcast episodes of a user
const MyList = ({ route }) =>{
    const user = auth().currentUser;
    const { myListStore } = useRootStore();
    const [list ,setList ] = useState([]);
    //TODO: might not be useful
    const [ gotList, setGotList ] =useState(false)
    //a constant to tell the <Episode /> what page he is on
    const fromMyListScreen=true;

    useEffect(()=>{
        showEpisodes();       
    })
    //shows all episodes selected by the user
    const show = () =>{
        if(myListStore.myList.length === 0){
            return <Text style={Styles.podcastTitle} >Nothing on the list</Text>
        }
        else{
            return myListStore.myList.map((track)=>{          
                return <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen}/>        
            })
        }     
    }
    

    const showEpisodes = async() =>{
        await firestore()
        .collection('myList')
        .get()
        .then((episodes) => {
            var l =[];
                episodes.docs.map((doc) => {                  
                    if(doc._data.email === user.email){
                        var track = {
                            id: doc._data.id,
                            url: doc._data.url,
                            title: doc._data.title,
                            artwork: doc._data.artwork,
                            artist: doc._data.artist,
                            description: doc._data.description,
                            duration:doc._data.duration,
                            rssUrl: doc._data.rssUrl,
                        }
                       
                        l.push(track);                       
                    }                             
                })
            setList(l);
            setGotList(true);
            }           
            
        )
    }
    var showList= list?(
        list.map((track)=>{
            return <Episode track={track} key={track.id} fromMyListScreen={fromMyListScreen}/> 
        })
    ):(
        <Text style={Styles.podcastTitle} >Nothing on the list</Text>
    )

    return (
        <ScrollView>
            {showList}
            <BottomGap />
        </ScrollView>
    )
}

export default observer(MyList);