import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAS29HwRwTQ0nhQZtmYwYmnt3nLBoEC-oI",
    authDomain: "gombestateuniversity-6ba62.firebaseapp.com",
    projectId: "gombestateuniversity-6ba62",
    storageBucket: "gombestateuniversity-6ba62.appspot.com",
    messagingSenderId: "820231933161",
    appId: "1:820231933161:web:09488838787d15fe62b478",
    measurementId: "G-QM83ZMSK4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const docRef = getFirestore(app);
export const auth = getAuth(app);