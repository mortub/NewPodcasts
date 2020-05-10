//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//gets the current user that uses the app
const user = auth().currentUser;

//adds to 'myList' collection a track of a user
export const addToList = async (track) => {
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

//deletes from 'myList' collection a track of a user
//recieves the id of the doc to delete
export const deleteFromList = async (toDelete) => {
    await firestore()
        .collection('myList')
        .doc(toDelete)
        .delete()
};

//search for a doc id of a track from 'myList' collection
//that belongs to this user
export const searchDocIdFromList = async (track) => {
    var toReturn = undefined;
    if (user) {
        await firestore()
            .collection('myList')
            .get()
            .then((episodes) => {
                episodes.docs.map((doc) => {
                    if (doc._data.email === user.email && doc._data.url === track.url) {
                        toReturn = doc.id;
                    }
                })
            })
    }
    return toReturn;
}

//gets all of the current user's episodes from 'myList' collection
export const showEpisodesFromMyList = async () => {
    var l = [];
    if (user) {
        await firestore()
            .collection('myList')
            .get()
            .then((episodes) => {
                episodes.docs.map((doc) => {
                    if (doc._data.email === user.email) {
                        var track = {
                            id: doc._data.id,
                            url: doc._data.url,
                            title: doc._data.title,
                            artwork: doc._data.artwork,
                            artist: doc._data.artist,
                            description: doc._data.description,
                            duration: doc._data.duration,
                            rssUrl: doc._data.rssUrl,
                        }

                        l.push(track);
                    }                 
                })
            })
    }
    return l;
}

//to add a subscriber to the collection 'subscribers'
export const addToSub = async(rssUrl, title, image)=>{       
    if(user){
        await firestore()
        .collection('subscribers')
        .add({
            email:user.email,
            podcastTitle:title,
            podcastImage:image,
            podcastRssUrl:rssUrl,
        })
    }       
}

//search for a doc id of a track from 'myList' collection
//that belongs to this user
export const searchDocIdFromSub = async (title)=>{
    var toDelete = undefined;
    await firestore()
    .collection('subscribers')
    .get()
    .then((subscribers)=>{
        subscribers.docs.map((doc)=>{
            if(doc._data.email === user.email && doc._data.podcastTitle === title){
               toDelete = doc.id;
            }
        })
    })
    return toDelete;    
}

//deletes from 'subscribers' collection a sub of a user
//recieves the id of the doc to delete
export const deleteFromSub = async (toDelete) =>{
    await firestore()
    .collection('subscribers')
    .doc(toDelete)
    .delete()
}

//TODO: gets all of the current user's subs from 'subscribers' collection
//export const showSubsFromSubscribers