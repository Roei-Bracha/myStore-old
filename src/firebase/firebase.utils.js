import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDY3qDMmZDhmGx3DgI4UwUgNuipRXLHJuk",
    authDomain: "my-shop-example.firebaseapp.com",
    databaseURL: "https://my-shop-example.firebaseio.com",
    projectId: "my-shop-example",
    storageBucket: "",
    messagingSenderId: "101760378814",
    appId: "1:101760378814:web:2964259d43885150"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const createUserProfileDocument = async (userAuth,  additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

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

    return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = ()=>{auth.signInWithPopup(provider)}

export default firebase