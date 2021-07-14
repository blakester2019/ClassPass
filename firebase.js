import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// require("dotenv").config()

/*
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyDB2XxtXO19jw-ZudjDRiXcDNU77GNzArw",
  authDomain: "class-pass-6861a.firebaseapp.com",
  projectId: "class-pass-6861a",
  storageBucket: "class-pass-6861a.appspot.com",
  messagingSenderId: "1033834624572",
  appId: "1:1033834624572:web:b5fabd3b3beb38f3a8f539"
};

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()
export { db, auth }