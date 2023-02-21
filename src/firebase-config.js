// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAONXWHHXTAChh87zaMNxUKKadH7xN79BA",
  authDomain: "chatapp-5a8ea.firebaseapp.com",
  projectId: "chatapp-5a8ea",
  storageBucket: "chatapp-5a8ea.appspot.com",
  messagingSenderId: "572862675577",
  appId: "1:572862675577:web:6c8971601fb1cae439f2a8",
  measurementId: "G-ET5J2YNMWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();