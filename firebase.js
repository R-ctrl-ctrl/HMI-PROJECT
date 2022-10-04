import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBmuUfCH_JLTVepbQvmD2vQ9k3lPW98cek",
  authDomain: "hmi-project-9d612.firebaseapp.com",
  projectId: "hmi-project-9d612",
  storageBucket: "hmi-project-9d612.appspot.com",
  messagingSenderId: "1029386052122",
  appId: "1:1029386052122:web:4178def7142d251edb67a3",
  measurementId: "G-Q283V8WGK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export  {auth,db,storage}