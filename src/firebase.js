import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {

    apiKey: "AIzaSyAUHanWw4k3PpPEoVlHzOxbRDEyJwmqWIs",

    authDomain: "todos-a7b55.firebaseapp.com",

    databaseURL: "https://todos-a7b55-default-rtdb.firebaseio.com",

    projectId: "todos-a7b55",

    storageBucket: "todos-a7b55.appspot.com",

    messagingSenderId: "491413917973",

    appId: "1:491413917973:web:d942816e4b2e9e037b991c"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = require('firebase/messaging')


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth,googleProvider);
        const user = res.user;
        const q = query(collection(db,"users"),where("uid","==",user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db,"users"),{
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email,password) => {
    try {
        const res = await signInWithEmailAndPassword(auth,email,password);
        const user = res.user;
        const q = query(collection(db,"users"),where("uid","==",user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db,"users"),{
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"users"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth,email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};

const { REACT_APP_VAPID_KEY } = process.env
const publicKey = REACT_APP_VAPID_KEY;

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });

// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ",payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo192.png",
//     };
//     return app.registration.showNotification(
//         notificationTitle,
//         notificationOptions
//     );
// });
const currentToken = ""
export const getToken = async (setTokenFound) => {
    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log('An error occurred while retrieving token.',error);
    }
    return currentToken;
};


export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};