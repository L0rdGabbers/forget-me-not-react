import React, { useState } from "react";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";

import {
  Form,
  Button,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      console.error('Error submitting form:', err);
      console.log('Response data:', err.response?.data);
      console.log('Status code:', err.response?.status);
      console.log('Status text:', err.response?.statusText);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container
      className={`${styles.FormContainer} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center`}>
        <h1 className={appStyles.Header}>Welcome to Forget Me Not</h1>
      </Row>
      <Row className={`${styles.Row} d-flex justify-content-center`}>

        <Form onSubmit={handleSubmit} className={styles.Form}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="email">
            <Form.Label className="d-none">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.email?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Again"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx} className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
      </Row>
    </Container>
  );
};

export default SignUpForm;
