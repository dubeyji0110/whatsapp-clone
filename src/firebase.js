import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBo3ivq5XFuUDfCd8YRjBaAOU9sIriU1i0",
    authDomain: "whatsapp-clone0110.firebaseapp.com",
    projectId: "whatsapp-clone0110",
    storageBucket: "whatsapp-clone0110.appspot.com",
    messagingSenderId: "390287830314",
    appId: "1:390287830314:web:e960c46b4bb7dfc3510253",
    measurementId: "G-5RMJ046G7M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;