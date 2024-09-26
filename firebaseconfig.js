// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDvTcJm0Ac4ZTYr7hRi2RD94QVa6qodgR4",
    authDomain: "bailey-s-database.firebaseapp.com",
    projectId: "bailey-s-database",
    storageBucket: "bailey-s-database.appspot.com",
    messagingSenderId: "138454029254",
    appId: "1:138454029254:web:1e4e27cd7654584d07d8c7",
    measurementId: "G-B5CQBCF4JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
