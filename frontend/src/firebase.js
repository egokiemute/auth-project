// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "binary-675cb.firebaseapp.com",
  databaseURL: "https://binary-675cb-default-rtdb.firebaseio.com",
  projectId: "binary-675cb",
  storageBucket: "binary-675cb.appspot.com",
  messagingSenderId: "1069173000484",
  appId: "1:1069173000484:web:35dfc2eefaea6315108bb1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);