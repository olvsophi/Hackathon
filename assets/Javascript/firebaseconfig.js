import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_iguptnlko5GuRple5QHcphqIHs95rU8",
  authDomain: "search-b2b0f.firebaseapp.com",
  projectId: "search-b2b0f",
  storageBucket: "search-b2b0f.firebasestorage.app",
  messagingSenderId: "643198606489",
  appId: "1:643198606489:web:7aeeebe32a3d8165e36c08"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };