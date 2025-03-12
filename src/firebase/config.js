// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC60juj7d6VbKIWOccbtfSvH5DrZ3r6vwI",
  authDomain: "lolo-parts.firebaseapp.com",
  projectId: "lolo-parts",
  storageBucket: "lolo-parts.firebasestorage.app",
  messagingSenderId: "61583036529",
  appId: "1:61583036529:web:07dd507b080dc33d1e4bd0",
  measurementId: "G-7GT79J8NGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics }; 