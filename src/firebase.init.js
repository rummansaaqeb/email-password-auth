// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB0w8J9Wvfk1R7RMszY73eiIlyB_wGQPNQ",
  authDomain: "email-password-auth-70bdc.firebaseapp.com",
  projectId: "email-password-auth-70bdc",
  storageBucket: "email-password-auth-70bdc.firebasestorage.app",
  messagingSenderId: "50303960809",
  appId: "1:50303960809:web:b846df71a4dc6f46d29278"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

