import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/auth/authManager";
import { useAuth } from "../../modules/auth/authContext";

const LoginPage: React.FC = () => {
  const { setUserProfile } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const loginSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
      login(email, password, setUserProfile)
      .then(() => navigate("/"))
      .catch(() => window.alert("Invalid email or password"));
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Form 
    onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            required
            className="login"
            id="email"
            type="text"
            autoFocus
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            required
            className="login"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup>
          <button className="navbar" type="submit">Login</button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}
export default LoginPage;