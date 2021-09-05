// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd-1UuhtsZN2l2nOJ1AdLJ1oDgo0O1auA",
  authDomain: "helpdesk-ed0e5.firebaseapp.com",
  databaseURL: "https://helpdesk-ed0e5-default-rtdb.firebaseio.com",
  projectId: "helpdesk-ed0e5",
  storageBucket: "helpdesk-ed0e5.appspot.com",
  messagingSenderId: "80671143372",
  appId: "1:80671143372:web:a83ff95fdb733fc06a5969",
  measurementId: "G-WLDBZHP2PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
