import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage, {showMessage} from "react-native-flash-message";
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SubscribeIcon = ({rssUrl, title, image}) => {
    const user = auth().currentUser;
    //to control the message given to the user
    const [added, setAdded] = useState(false);

   //to delete a subscriber if the user chose it
    const unSub = async() =>{
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
        if(toDelete){
            await firestore()
            .collection('subscribers')
            .doc(toDelete)
            .delete()
        }
    }
    //to add a subscriber if the user chose it
    const addSub = async()=>{       
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
    //if the user added sub, show unsub bottom,
    //otherwise, show sub bottton
    var showSubOrUnsub = added?(
        <TouchableOpacity
        style={{
            paddingLeft:20,
      width:200 ,
      flexDirection: 'row',
      marginTop: 10,
      backgroundColor: '#FFE4E1',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFE4E1'
        }}
        onPress={() => {
            setAdded(false);
            unSub();        
        }}
        >             
         <Icon name="deleteuser" size={30} style={{paddingTop: 10}}/>           
         <Text style={{paddingLeft: 10,paddingTop:15,fontFamily:'Lobster-Regular', fontSize:20}}>Unsubscribe</Text>           
        </TouchableOpacity>  
    ):(
        <TouchableOpacity
        style={{
            paddingLeft:20,
      width:200 ,
      flexDirection: 'row',
      marginTop: 10,
      backgroundColor: '#FFE4E1',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFE4E1'
        }}
        onPress={() => {
            setAdded(true);
            addSub();        
        }}
        >             
         <Icon name="adduser" size={30} style={{paddingTop: 10}}/>           
         <Text style={{paddingLeft: 10,paddingTop:15,fontFamily:'Lobster-Regular', fontSize:20}}>Subscribe</Text>           
        </TouchableOpacity>       
    )
   
    return (
        <>
        {showSubOrUnsub}
        </>
    )
       
};

export default SubscribeIcon;