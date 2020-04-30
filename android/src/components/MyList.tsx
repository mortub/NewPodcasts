import React from 'react';
import { View, Text, Button } from 'react-native';


//represents the reserved podcast episodes of a user
const MyList = ({ route }) =>{
    const show = route.params? <Text>{route.params.name}</Text>
    : undefined ;
    return (
        <View>
        {show}
        </View>
    )
}

export default MyList;