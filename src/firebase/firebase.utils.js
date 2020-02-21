import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBa4QVleWmAYUeKRuYosFL2wNYUj6Dq3Nc",
    authDomain: "learning-268909.firebaseapp.com",
    databaseURL: "https://learning-268909.firebaseio.com",
    projectId: "learning-268909",
    storageBucket: "learning-268909.appspot.com",
    messagingSenderId: "844591477372",
    appId: "1:844591477372:web:8e3e53d353de5a2e288ff9",
    measurementId: "G-0Z13MLJLDR"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

/**
 * 
 * @param {*} userAuth  the firebase auth data we get from signing
 * @param {*} additionalData 
 */
export const createUserProfileDocument = async (userAuth,  additionalData) =>{
    if(!userAuth) return;
    // create a ref to the object in the database
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    // try to get a snapshot
    const snapShot = await userRef.get()
    //if there is no snapshot - create the user in the database
    if(!snapShot.exists){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating the user' + error)
        }
    }
    // pass back the ref to the object in the database - any way now there is the user data there.
    return userRef;
}

// creating a login with google:
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = ()=>{auth.signInWithPopup(provider)}

export default firebase