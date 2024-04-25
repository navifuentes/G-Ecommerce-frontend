// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "online-shop-391b9.firebaseapp.com",
  projectId: "online-shop-391b9",
  storageBucket: "online-shop-391b9.appspot.com",
  messagingSenderId: "876133570974",
  appId: "1:876133570974:web:9ef617437b0ef27f65de8f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
