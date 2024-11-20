// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJydz42J5VrO-XbXjRyG_6ZWUFkT8Z4e4",
    authDomain: "vue-firebase-52ad7.firebaseapp.com",
    projectId: "vue-firebase-52ad7",
    storageBucket: "vue-firebase-52ad7.firebasestorage.app",
    messagingSenderId: "135105153048",
    appId: "1:135105153048:web:d2e96fd32731c1f532db6d"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };