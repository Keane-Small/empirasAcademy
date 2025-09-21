// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCT66hhA0ILeNCaAXkwQH_muAVH-JkTXNg",
  authDomain: "afrihack25connect.firebaseapp.com",
  projectId: "afrihack25connect",
  storageBucket: "afrihack25connect.firebasestorage.app",
  messagingSenderId: "233041342533",
  appId: "1:233041342533:web:e3c15cf7c3ddd475c6f32c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc, serverTimestamp };
  
