// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTf-ooUf-OmQQkskKZe6LmdK5SEdMCurM",
  authDomain: "react-blogging-app-c4972.firebaseapp.com",
  projectId: "react-blogging-app-c4972",
  storageBucket: "react-blogging-app-c4972.appspot.com",
  messagingSenderId: "561962664812",
  appId: "1:561962664812:web:958c780edfc07f3a3a6949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
