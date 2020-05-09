import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
//components
import { useRootStore } from '../contexts/RootStoreContext';
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddToListIcon = ({ track,fromMyListScreen}) => {
    const user = auth().currentUser;
    const { myListStore } = useRootStore();
    const [added, setAdded] = useState(false);

    const addToList = async () => {
        if (user) {
            await firestore()
                .collection('myList')
                .add({
                    email: user.email,
                    id: track.id,
                    url: track.url,
                    title: track.title,
                    artwork: track.artwork,
                    artist: track.artist,
                    description: track.description,
                    duration: track.duration,
                    rssUrl: track.rssUrl,
                })
        }
    };

    const unAddToList = async () => {
        var toDelete = undefined;
        await firestore()
            .collection('myList')
            .get()
            .then((episodes) => {
                episodes.docs.map((doc) => {
                    if (doc._data.email === user.email && doc._data.url === track.url) {
                        toDelete = doc.id;
                    }
                })
            })
        if (toDelete) {
            await firestore()
                .collection('myList')
                .doc(toDelete)
                .delete()
        }
    }

    var showAddOrDeleteFromList = added ? (
        <Icon name='minuscircle' size={30} style={{ paddingLeft: 20 }}
            onPress={() => {
                unAddToList();
                setAdded(false);
                //adding the episode to my list
                myListStore.DeleteTrack(track);
            }} />
    ) : (
            <Icon name='pluscircle' size={30} style={{ paddingLeft: 20 }}
                onPress={() => {
                    addToList()
                    setAdded(true);

                    //adding the episode to my list
                    myListStore.addTrack(track);
                }} />
        )

        var show = fromMyListScreen? (
            <Icon name='minuscircle' size={30} style={{ paddingLeft: 20 }}
            onPress={() => {
                unAddToList();
                //setAdded(false);
                //adding the episode to my list
                myListStore.DeleteTrack(track);
            }} />
        ):(
           showAddOrDeleteFromList 
        )

    return (
        <>
            {show}
        </>
    )
};

export default AddToListIcon;
