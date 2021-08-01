import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../../modules/authManager";
import "./Auth.css"

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <Form onSubmit={loginSubmit} className="login">
      <div className="loginHeader">
        <h1>Let's start this party!</h1>
      </div>
      <fieldset>
        <FormGroup  className="loginBox">
          <Label for="email">Email</Label>
          <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <div className="buttonBox">
          <Button className="button">Login</Button>
          </div>
        </FormGroup>
        <div className="registerCallout">
          Not registered? <Link to="register">Register</Link>
        </div>
      </fieldset>
    </Form>
  );
}