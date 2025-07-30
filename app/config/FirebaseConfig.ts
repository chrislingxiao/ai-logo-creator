// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'ai-logo-creator-b89eb.firebaseapp.com',
  projectId: 'ai-logo-creator-b89eb',
  storageBucket: 'ai-logo-creator-b89eb.firebasestorage.app',
  messagingSenderId: '107006045317',
  appId: '1:107006045317:web:42be4261a2b8e3c6864dec',
  measurementId: 'G-TM7WYS1CYQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
