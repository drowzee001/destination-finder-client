import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const selectError = (state) => state.error;
  const error = useSelector(selectError);
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
    } else if (firstName === "") {
      setMsg("Please enter a first name");
    } else if (lastName === "") {
      setMsg("Please enter a last name");
    } else if (email === "") {
      setMsg("Please enter an email");
    } else if (password === "") {
      setMsg("Please enter password");
    } else if (confirmPassword === "" && password !== "") {
      setMsg("Please confirm password");
    } else {
      const user = { firstName, lastName, email, password };
      dispatch(register(user));
    }
  }
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
    if (auth.isAuthenticated) history.push("/");
  }, [error, auth]);

  if (auth.isLoading === false && auth.isAuthenticated === false) {
    return (
      <Container id="formContainer">
        <h1>Register</h1>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
        <Form
          id="form"
          onSubmit={(event) => {
            onSubmit(event);
          }}
        >
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name here"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name here"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter password here"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </FormGroup>
          <Button id="formButton">Register</Button>
        </Form>
      </Container>
    );
  } else {
    return null;
  }
};

export default Register;
