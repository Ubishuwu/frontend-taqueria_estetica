import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHF1zplHI2k-mko13u57hE_oAnbFnlWYg",
    authDomain: "automatas2-ccae9.firebaseapp.com",
    projectId: "automatas2-ccae9",
    storageBucket: "automatas2-ccae9.appspot.com",
    messagingSenderId: "617432499252",
    appId: "1:617432499252:web:1dd69c9cbab42785207661"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();

export {timestamp}
export {auth}
export default firebaseApp.firestore();

