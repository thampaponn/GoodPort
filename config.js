import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKsXY3VBH_z5rhFYC9Kcgfpb6g3dnoR0I",
  authDomain: "goodport-cb0e6.firebaseapp.com",
  projectId: "goodport-cb0e6",
  storageBucket: "goodport-cb0e6.appspot.com",
  messagingSenderId: "255860926883",
  appId: "1:255860926883:web:c122c18c3c338f421e5216",
  measurementId: "G-N4Q8EK7TTP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
