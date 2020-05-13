import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../contexts/RootStoreContext';

const SubscribeIcon = ({rssUrl, title, image}) => {
    //the local store of the user's subscribers list
    const { subStore } = useRootStore();
    //to control the message given to the user
    const [added, setAdded] = useState(false);
    //to add to db+subStore
    const sub = {
        image: image,
        rssUrl: rssUrl,
        title: title,
    }

    useEffect(()=>{
        if(subStore.checkIsSubOnSubList(sub)){
            setAdded(true);
        } else{
            setAdded(false)
        }
    },[subStore.subscribers])
    

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
            subStore.DeleteSub(sub);
            setAdded(false);      
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
            subStore.addSub(sub);
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