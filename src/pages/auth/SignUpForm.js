import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignUpInForm.module.css"
import appStyles from "../../App.module.css"

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    surname: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { firstname, surname, username, email, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({})
  const history = useHistory();
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/dj-rest-auth/registration/', signUpData);
      console.log('Form submitted successfully:', response.data);
      history.push('/signin');
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
          <Form.Group controlId="firstName">
            <Form.Label className="d-none">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstname"
              value={firstname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label className="d-none">Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your surname"
              name="surname"
              value={surname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label className="d-none">Email address</Form.Label>
            <Form.Control
              type="email"
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
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUpForm