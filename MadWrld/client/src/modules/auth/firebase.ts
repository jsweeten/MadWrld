import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxX8qL_eqtu8-_ZVwtFA0wUEpxwvvUkQI",
    authDomain: "madwrld-d9a56.firebaseapp.com",
    projectId: "madwrld-d9a56",
    storageBucket: "madwrld-d9a56.appspot.com",
    messagingSenderId: "1061454358854",
    appId: "1:1061454358854:web:f2167d6c730c2516b05d47",
    measurementId: "G-CMG3Y9F7LV"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;