// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNT43qE40HKKp6gmjKHwe1TI_uYSkxzwI",
  authDomain: "fbdm-9712c.firebaseapp.com",
  projectId: "fbdm-9712c",
  storageBucket: "fbdm-9712c.appspot.com",
  messagingSenderId: "767831687457",
  appId: "1:767831687457:web:bee13a3814c8ee54873e60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
