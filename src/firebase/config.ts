import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlPgJyKjTNRWM37_DQi7bl6aiIVfdwfro",
  authDomain: "moise-portefolio.firebaseapp.com",
  projectId: "moise-portefolio",
  storageBucket: "moise-portefolio.firebasestorage.app",
  messagingSenderId: "567169749173",
  appId: "1:567169749173:web:915e36d4d1e7b0a145aefc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
