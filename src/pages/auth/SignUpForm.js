// SignUpForm.js
// Allows for the user to create a profile.
import React, { useState } from "react";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Component for user registration form.
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

  // Function to handle changes in form input fields.
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending a registration request to the server.
      await axios.post("/dj-rest-auth/registration/", signUpData);
      // Redirecting to the sign-in page after successful registration.
      history.push("/signin");
    } catch (err) {
      // Handling errors and updating the state with error messages.
      console.error('Error submitting form:', err);
      setErrors(err.response?.data || {});
    }
  };
  
  // JSX structure for the sign-up form.
  return (
    <Container
      className={`${styles.FormContainer} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center text-center mb-5 mx-2`}>
        {/* Heading for the sign-up form */}
        <h1 className={appStyles.Header}>Welcome to Forget Me Not</h1>
      </Row>
      <Row className={`${styles.Row} d-flex justify-content-center`}>
        {/* Form component for user registration */}
        <Form onSubmit={handleSubmit}>
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
            // Displaying warnings for username errors, if any.
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
            // Displaying warnings for email errors, if any.
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
            // Displaying warnings for password errors, if any.
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
            // Displaying warnings for password errors, if any.
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

           {/* Submission button */}
          <Col className="d-flex justify-content-center">
            <Button className={btnStyles.Button} type="submit">
              Sign Up
            </Button>
          </Col>
          {errors.non_field_errors?.map((message, idx) => (
            // Displaying warnings for general form errors.
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
