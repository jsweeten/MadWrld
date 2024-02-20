import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/auth/authManager";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        firstName,
        lastName,
        email
      };
      register(userProfile, password).then(() => navigate("/"))
      .catch(() => window.alert("Something went wrong while attempting to create user."));
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  }
  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  }
  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.target.value);
  }
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmPassword(e.target.value);
  }

  return (
    <Form onSubmit={registerSubmit}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            className="login"
            id="firstName"
            type="text"
            onChange={handleFirstNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            className="login"
            id="lastName"
            type="text"
            onChange={handleLastNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            className="login"
            id="email"
            type="text"
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            className="login"
            id="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            className="login"
            id="confirmPassword"
            type="password"
            onChange={handleConfirmPasswordChange}
          />
        </FormGroup>
        <FormGroup>
          <button className="navbar">Register</button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}

export default Register;