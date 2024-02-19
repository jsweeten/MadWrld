import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyDxX8qL_eqtu8-_ZVwtFA0wUEpxwvvUkQI"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);