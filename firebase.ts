import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyCb7eOICk0NSfrV0cQ7T2zj4X7MHGbY-z4',
    authDomain: 'ayuda-b2079.firebaseapp.com',
    databaseURL: 'https://ayuda-b2079.firebaseio.com',
    projectId: 'ayuda-b2079',
    storageBucket: 'ayuda-b2079.appspot.com',
    messagingSenderId: '164845165625',
    appId: '1:164845165625:web:58ee14d6bff227fd0c01e8',
    measurementId: 'G-WTY03LGS8D',
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = app.auth();
const db = app.firestore();

export { db, auth };
