/**
 * @Purpose Configuration of the auth, database systems
 */

// Imports
 import firebase from "firebase"
 import "firebase/auth"
 import "firebase/database"

// Configuration object
const firebaseConfig = {
    apiKey: "AIzaSyC-xYY5gFfcLhck3bt8Hb5dwITZCnkRyWU",
    authDomain: "encryptolog-571ef.firebaseapp.com",
    projectId: "encryptolog-571ef",
    storageBucket: "encryptolog-571ef.appspot.com",
    messagingSenderId: "375789483977",
    appId: "1:375789483977:web:fe77fe21c7bcdb81141a18",
    measurementId: "G-K1LKTE38FF"
};

// App initializing
const app = firebase.initializeApp(firebaseConfig);

// Export app's auth & database instances
export const auth = app.auth();
export const database = app.database();
export const firestore = app.firestore();

// Export the app
export default app;