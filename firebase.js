import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmDGc6vsySgyXiZ5eE-OXFGnERH_bgn3I",
  authDomain: "playr-9b81d.firebaseapp.com",
  projectId: "playr-9b81d",
  storageBucket: "playr-9b81d.firebasestorage.app",
  messagingSenderId: "552885878114",
  appId: "1:552885878114:web:3a5aed4286fba39cf1003b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
