// Firebase config — public-safe (security comes from Firestore rules, not key secrecy)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCD7QgRtIO8cuFqAnXbEUl4vSPjKHlyfEk",
  authDomain: "card-d8066.firebaseapp.com",
  projectId: "card-d8066",
  storageBucket: "card-d8066.firebasestorage.app",
  messagingSenderId: "395398406778",
  appId: "1:395398406778:web:19bf21802f02999d6cd1c3",
  measurementId: "G-8CXW59B6XY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
