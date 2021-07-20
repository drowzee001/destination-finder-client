import React, { useEffect, useState } from "react";
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
import { login } from "../redux/actions/authAction";

const Login = () => {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);

  const selectError = (state) => state.error;
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      setMsg("Please enter an email");
    } else if (password === "") {
      setMsg("Please enter password");
    } else {
      const user = { email, password };
      dispatch(login(user));
    }
  };
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
    if (auth.isAuthenticated) history.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, auth]);

  if (auth.isLoading === false && auth.isAuthenticated === false) {
    return (
      <Container id="formContainer">
        <h1>Login</h1>
        {msg ? (
          <Alert id="alert" color="danger">
            {msg}
          </Alert>
        ) : null}
        <Form id="form">
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
          <a href="/signup">Don't have an account? Create one here!</a>
          <Button id="formButton" onClick={(event) => onSubmit(event)}>
            Log In
          </Button>
        </Form>
      </Container>
    );
  } else {
    return null;
  }
};

export default Login;
