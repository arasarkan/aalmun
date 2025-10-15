import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyAtsUfCkt6MOCfaplNF8kUEgQCEFehwnfA",
  authDomain: "aalmun-playground.firebaseapp.com",
  databaseURL: "https://aalmun-playground-default-rtdb.firebaseio.com",
  projectId: "aalmun-playground",
  storageBucket: "aalmun-playground.firebasestorage.app",
  messagingSenderId: "417942363501",
  appId: "1:417942363501:web:ed722f77118c77c2054e64",
  measurementId: "G-ZGGM116YHH"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize App Check with reCAPTCHA
if (process.env.NODE_ENV === 'production') {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''),
    isTokenAutoRefreshEnabled: true,
  });
}

export default app;