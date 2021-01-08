import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC8uk7ArK9vX7_uJEwdaTCfVbhi8yRx4Ng",
    authDomain: "marvie-twitter-clone.firebaseapp.com",
    projectId: "marvie-twitter-clone",
    storageBucket: "marvie-twitter-clone.appspot.com",
    messagingSenderId: "822597645014",
    appId: "1:822597645014:web:46d498c8ac361878bf8f77",
    measurementId: "G-EZFT9TJBBB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const Database = firebaseApp.firestore()

export const auth = firebase.auth();


export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = Database.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export default Database;
