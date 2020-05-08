import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { WEB_CLIENT_ID } from './WEB_CLIENT_ID';


GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, 
    });

//puts a new user in the users collection, if user does not exist already
//recieves the user that logged in
export const addUserIfNeeded = async (user) => {
    await firestore()
        .collection('users')
        .get()
        .then(async(users) => {
            var addUser = true;
            users.docs.map((doc) => {
                //if the user already exists, no need to add user
                if (doc._data.userId === user.uid) {
                    addUser = false;
                }
            });
           // if true - user wasn't found in users, add it
            if (addUser) {
               await firestore()
                    .collection('users')
                    .add({
                        userId: user.uid,
                        email: user.email
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        });

};

export async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
};

