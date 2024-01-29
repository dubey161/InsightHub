// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-a90ab.firebaseapp.com",
    projectId: "mern-blog-a90ab",
    storageBucket: "mern-blog-a90ab.appspot.com",
    messagingSenderId: "365790880361",
    appId: "1:365790880361:web:16779831e0117c1b20b8f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);