// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWlR_TIj_UEG-u4KsQOOiKSEtVvaad1vY",
  authDomain: "shomvob-travels.firebaseapp.com",
  projectId: "shomvob-travels",
  storageBucket: "shomvob-travels.firebasestorage.app",
  messagingSenderId: "817731721427",
  appId: "1:817731721427:web:96db422aecbf9e68d8dc26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);