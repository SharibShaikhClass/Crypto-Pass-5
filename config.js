import firebase from "firebase";
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyCQ0u4QJH63nrhDTv8ICEq2OonvXZU-Pf0",
    authDomain: "passwordapp-efebf.firebaseapp.com",
    projectId: "passwordapp-efebf",
    storageBucket: "passwordapp-efebf.appspot.com",
    messagingSenderId: "935484207851",
    appId: "1:935484207851:web:f06b70f16ae19ac8d004ae"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();