import React, { useEffect, useState } from "react";
import "./App.css";
import { Spinner } from "reactstrap";
import Header from "./components/nav/Header";
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
import auth from "./modules/auth/firebase";
import LoginPage from "./components/user/LoginPage";
import { onLoginStatusChange, me } from "./modules/auth/authManager";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserProfile(user);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === true) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
        {isLoggedIn ? (
          <ApplicationViews isLoggedIn={isLoggedIn} userProfile={userProfile} />
        ) : (
          <LoginPage />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;