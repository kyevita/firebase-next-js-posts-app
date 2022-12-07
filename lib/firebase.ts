import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5N-d9CJX5MZNrUXipvRtg9d-10gSeWfw",
  authDomain: "firbase-next-tutorial.firebaseapp.com",
  projectId: "firbase-next-tutorial",
  storageBucket: "firbase-next-tutorial.appspot.com",
  messagingSenderId: "342781454785",
  appId: "1:342781454785:web:e41f340ed653396d63e740",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const storage = firebase.storage();
