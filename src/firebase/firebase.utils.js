import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyAdXFppQ8fomThhZ32bz6Pkfz3YHKFQJEg",
    authDomain: "crwn-db-8c36a.firebaseapp.com",
    projectId: "crwn-db-8c36a",
    storageBucket: "crwn-db-8c36a.appspot.com",
    messagingSenderId: "1077254313543",
    appId: "1:1077254313543:web:8bfe455dcedd2e452cc362",
    measurementId: "G-QXWDFS5N83"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;