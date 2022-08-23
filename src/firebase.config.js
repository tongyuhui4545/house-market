import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm70oUj5XmWKa4143S3SCySdZ5csVbHpc",
  authDomain: "housemarketing-3dd7c.firebaseapp.com",
  projectId: "housemarketing-3dd7c",
  storageBucket: "housemarketing-3dd7c.appspot.com",
  messagingSenderId: "199163136547",
  appId: "1:199163136547:web:96a1904ecb43b8d1dfff96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app, db };
