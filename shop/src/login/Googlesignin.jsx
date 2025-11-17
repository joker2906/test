// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signINWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVWcqjAjXEuK4HTYeJsmEg-vAzSe5qN8E",
  authDomain: "shopping-442e2.firebaseapp.com",
  projectId: "shopping-442e2",
  storageBucket: "shopping-442e2.firebasestorage.app",
  messagingSenderId: "700730187686",
  appId: "1:700730187686:web:1426c51872b084e755f967",
  measurementId: "G-TCS5M9M1BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export {signINWithPopup};