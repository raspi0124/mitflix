import firebase from "firebase/app";
import "firebase/analytics";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCq-fBwwshWbL_5cjwmh1rR1yLBffe92Mw",
    authDomain: "mitapro.firebaseapp.com",
    projectId: "mitapro",
    storageBucket: "mitapro.appspot.com",
    messagingSenderId: "28780919795",
    appId: "1:28780919795:web:5550d31b99da435e307086",
    measurementId: "G-03WSPTJCWX"
  });
}

export default firebase;
