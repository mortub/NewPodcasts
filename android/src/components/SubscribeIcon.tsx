import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { addToSub, searchDocIdFromSub, deleteFromSub } from '../utils/FirestoreFetches';

const SubscribeIcon = ({rssUrl, title, image}) => {
    //to control the message given to the user
    const [added, setAdded] = useState(false);

   //to delete a subscriber if the user chose it
    const unSub = async() =>{
        searchDocIdFromSub(title)
        .then((docId)=>{
            deleteFromSub(docId);
        })
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
            addToSub(rssUrl, title, image);
            setAdded(true);  
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