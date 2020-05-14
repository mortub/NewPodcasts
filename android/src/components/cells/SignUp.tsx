import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
//components
import { Styles } from '../../theme/Styles';

//represents the sign up screen of the app
const SignUp = ({onGoogleButtonPress}) =>{
   
    return (
        <TouchableOpacity 
        style={Styles.clickableOpacity}
         onPress ={()=> {           
                onGoogleButtonPress()
                .then(() => 
                {        
                })
                .catch((err)=>{
                  console.log(err)
                });
         }}>
              <Icon name="google" size={30} style={{paddingTop: 10, paddingLeft: 10}}/>
            <Text style={Styles.searchInHomeText}>Sign up</Text>
        </TouchableOpacity>
    )
}

export default SignUp;