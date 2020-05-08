import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FlashMessage, {showMessage} from "react-native-flash-message";
//firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SubscribeIcon = () => {
    //to control the message given to the user
    const [added, setAdded] = useState(false);
    //to add a subscriber if the user chose it
    const addSub = async()=>{
        //TODO: need to get all info from EpisodesView
        const user = auth().currentUser;
        if(!user){
            await firestore()
            .collection('subscribers')
            .add({
                userId:user.uid,
                podcastTitle:'',
                podcastImage:'',
                podcastUrl:'',
            })
        }       
    }
    //shows the user a message he has subscribed
    const showAddedFunc =() =>{
        //when adding to list, let the user know
        showMessage({
        message: "Subscribed",
        type: "success",
        backgroundColor: '#FFE4E1',
        color: 'black',
        }); 
    }
    //whether to show a message of supscription or not
    var showAdded = added? (
        <FlashMessage ref={showAddedFunc} position='bottom' />
    ):(
        undefined
    );
   
    return (
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
            setTimeout(function () {
                setAdded(false);
            }, 400);          
        }}
        >             
         <Icon name="adduser" size={30} style={{paddingTop: 10}}/>           
         <Text style={{paddingLeft: 10,paddingTop:15,fontFamily:'Lobster-Regular', fontSize:20}}>Subscribe</Text>           
         {showAdded}  
        </TouchableOpacity>       
    )
};

export default SubscribeIcon;