import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCerjvHHanze8I8bW2YE3OILJg9iDIeaZw",
  authDomain: "voting-system-39e83.firebaseapp.com",
  projectId: "voting-system-39e83",
  storageBucket: "voting-system-39e83.appspot.com",
  messagingSenderId: "109446524054",
  appId: "1:109446524054:web:0283728184b40471f3a6b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
