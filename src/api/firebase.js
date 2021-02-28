import Firebase from 'firebase/app'
import auth from 'firebase/auth'
import firestore from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGyB0TzE4d3nAoonUR8pcK86-EOAUclnk",
  authDomain: "teamup-b4559.firebaseapp.com",
  projectId: "teamup-b4559",
  storageBucket: "teamup-b4559.appspot.com",
  messagingSenderId: "892609344946",
  appId: "1:892609344946:web:6df05c0eea0134bb88a0ab",
  measurementId: "G-V3PZRDWBV1"
}

Firebase.initializeApp(firebaseConfig)

// const db = Firebase.firestore()
// const auth = Firebase.auth()

// /** collections */
// const users = db.collection('user')
// const teams = db.collection('teams')

export default  Firebase