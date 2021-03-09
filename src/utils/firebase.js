import firebase from 'firebase/app';
import 'firebase/firestore';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBFtK-QANCxDv_lh4lcVq--54JmiyI-FW8",
    authDomain: "seat-reservations.firebaseapp.com",
    databaseURL: "https://seat-reservations.firebaseio.com",
    projectId: "seat-reservations",
    storageBucket: "seat-reservations.appspot.com",
    messagingSenderId: "710623497078",
    appId: "1:710623497078:web:cbd6a96d7ed2f751f88857"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
  export const seats = db.collection("seats"); 
  export const seatingInfo = db.collection("seatingInfo");

  export default firebase;