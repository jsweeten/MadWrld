import React from "react";
// import { Form, FormGroup, Label, Input } from 'reactstrap';
//import { useNavigate, Link } from "react-router-dom";
import EmailPasswordAuth from "./EmailPasswordAuth";
// import { login } from "../../modules/auth/authManager";

const LoginPage: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <div>
      <h2>Login Page</h2>
      <EmailPasswordAuth />
    </div>
  );
}
export default LoginPage;