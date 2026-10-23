import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const useEmulators = import.meta.env.DEV && import.meta.env.VITE_FIREBASE_EMULATORS === "true";

const firebaseConfig = {
  apiKey: "AIzaSyAlPgJyKjTNRWM37_DQi7bl6aiIVfdwfro",
  authDomain: "moise-portefolio.firebaseapp.com",
  projectId: useEmulators ? "demo-moises-portfolio" : "moise-portefolio",
  storageBucket: useEmulators ? "demo-moises-portfolio.appspot.com" : "moise-portefolio.firebasestorage.app",
  messagingSenderId: "567169749173",
  appId: "1:567169749173:web:915e36d4d1e7b0a145aefc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (useEmulators) {
  const host = window.location.hostname;
  const port = Number(window.location.port) || 80;
  connectAuthEmulator(auth, `http://${host}:${port}`, { disableWarnings: true });
  connectFirestoreEmulator(db, host, port);
  connectStorageEmulator(storage, host, port);
}

export default app;
