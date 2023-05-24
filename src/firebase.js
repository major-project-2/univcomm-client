// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC08stgzDAXnY4I4V2Dt7nOwJmFFMwO7ZQ",
  authDomain: "univcomm-26071.firebaseapp.com",
  projectId: "univcomm-26071",
  storageBucket: "univcomm-26071.appspot.com",
  messagingSenderId: "166901434959",
  appId: "1:166901434959:web:d63df238cb86d114b9383a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
