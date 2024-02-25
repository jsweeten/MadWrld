import React from "react";
import "./App.css";
import Header from "./components/nav/Header";
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./components/user/LoginPage";
import { useAuth } from "./modules/auth/authContext";

const App: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {userProfile ? <ApplicationViews /> : <LoginPage />}
      </BrowserRouter>
    </div>
  );
}

export default App;