import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBFAFBsHmxdbfVmDybKWt5iI8qnun2wJcM",
  authDomain: "finni-project.firebaseapp.com",
  projectId: "finni-project",
  storageBucket: "finni-project.appspot.com",
  messagingSenderId: "115396778540",
  appId: "1:115396778540:web:8fec9ebaa4a9db137dcf89"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()