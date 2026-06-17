// Import the functions you need from the SDKs you need

import {initializeApp}from "https://www.gstatic.com/firebase/12.0.0/firebase-app.js";
import {getDatabase}from "https://www.gstatic.com/firebase/12.0.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_iguptnlko5GuRple5QHcphqIHs95rU8",
  authDomain: "search-b2b0f.firebaseapp.com",
  databaseURL: "https://search-b2b0f-default-rtdb.firebaseio.com",
  projectId: "search-b2b0f",
  storageBucket: "search-b2b0f.firebasestorage.app",
  messagingSenderId: "643198606489",
  appId: "1:643198606489:web:7aeeebe32a3d8165e36c08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


