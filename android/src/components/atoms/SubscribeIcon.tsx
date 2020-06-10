import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { useRootStore } from '../../contexts/RootStoreContext';
import { Styles } from '../../theme/Styles'; 

//component for the adding/removing a podcast from subscribers list
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
        //if subscribed to odcast, show unsub icon, else show the sub icon
        if(subStore.checkIsSubOnSubList(sub)){
            setAdded(true);
        } else{
            setAdded(false)
        }
    },[subStore.subscribers])
    

    //if the user added sub, show unsub bottom,
    //otherwise, show sub bottton
    var showSubOrUnsub = added?(
        <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity
                style={{
                    paddingLeft: 20,
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    marginTop: 10,
                    backgroundColor: Styles.mainColor,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Styles.mainColor
                }}
                onPress={() => {
                    //remove the subscription to this podcast
                    subStore.DeleteSub(sub);
                    setAdded(false);
                }}
            >
                <Icon name="deleteuser" size={30} style={{ paddingTop: 10 }} color={Styles.secondColor}/>
                <Text style={{ paddingLeft: 10, paddingTop: 15, fontFamily: 'Lobster-Regular', fontSize: 20, color:Styles.secondColor }}>Unsubscribe</Text>
            </TouchableOpacity>
            <Text style={{ paddingEnd: 150 }}></Text>
        </View> 
    ):(
            <View style={{ flexDirection: 'row' }} >
                <TouchableOpacity
                    style={{
                        paddingLeft: 20,
                        flex: 1,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor: Styles.mainColor,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Styles.mainColor
                    }}
                    onPress={() => {
                        //add the podcast to subscribers         
                        subStore.addSub(sub);
                        setAdded(true);
                    }}
                >
                    <Icon name="adduser" size={30} style={{ paddingTop: 10 }} color={Styles.secondColor}/>
                    <Text style={{ paddingLeft: 10, paddingTop: 15, fontFamily: 'Lobster-Regular', fontSize: 20 ,color:Styles.secondColor}}>Subscribe</Text>
                </TouchableOpacity>
                <Text style={{ paddingEnd: 150 }}></Text>
            </View>            
    )
   
    return (
        <View style={{flex:1}}>
        {showSubOrUnsub}
        </View>
    )
       
};

export default SubscribeIcon;