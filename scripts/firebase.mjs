import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Putting this in public feels illegal.
const config = {
  apiKey: "AIzaSyCp9SNEZC6NrBMJwRj3ZARpOCy-K3RQEKM",
  authDomain: "kubryn.firebaseapp.com",
  projectId: "kubryn",
  storageBucket: "kubryn.firebasestorage.app",
  messagingSenderId: "1061931867194",
  appId: "1:1061931867194:web:f284eb0ec1cd459094e903",
  databaseURL:
    "https://kubryn-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(config);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("uid", user.uid)
  } else {
    signInAnonymously(auth);
  }
});

const db = getDatabase(app)
const uid = localStorage.getItem("uid")

export { db, uid }