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

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = ()=>{auth.signInWithPopup(provider)}

export default firebase