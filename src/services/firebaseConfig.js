// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeBISW0uKZMexCyMbp4ej57rn7VRN3fLc",
  authDomain: "home-stead1.firebaseapp.com",
  projectId: "home-stead1",
  storageBucket: "home-stead1.appspot.com",
  messagingSenderId: "569315176902",
  appId: "1:569315176902:web:bf71da9cf9a11dd624c2c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
