import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  // This is a hack, because for some reason that I'm not fully understand, if you remove the concatenation from the env variables
  // you will get an error with the API key, but if you console log this object (without the concatenation) and put it directally in the function call it will work!!
  // JS in a nutshell :)
  apiKey: `${process.env.FB_API_KEY}`,
  authDomain: `${process.env.FB_AUTH_DOMAIN}`,
  projectId: `${process.env.FB_PROJECT_ID}`,
  storageBucket: `${process.env.FB_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FB_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FB_APP_ID}`,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const storage = firebase.storage();
