import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKET}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASEURL}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app);
