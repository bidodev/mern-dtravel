import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMnkIVqXxRuZBmNpM077KJmN7h6UVvLYA",
  authDomain: "dtravel-db.firebaseapp.com",
  databaseURL: "https://dtravel-db.firebaseio.com",
  projectId: "dtravel-db",
  storageBucket: "dtravel-db.appspot.com",
  messagingSenderId: "950093241760",
  appId: "1:950093241760:web:65920908d68eb4f1e898c5",
  measurementId: "G-CGCYPV1KE9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
