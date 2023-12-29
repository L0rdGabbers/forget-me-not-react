// SignInForm.js
// Allows for the user to log into their profile.
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
// Context hook for managing the current user state
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// Util function to manage token timestamps
import { setTokenTimestamp } from "../../utils/utils";

// Component for user sign-in form.
const SignInForm = () => {
  // Context hook for setting the current user
  const setCurrentUser = useSetCurrentUser();

  // State to manage form input values and errors.
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  })

  // Setters for form input values.
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // Function to handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sending a login request to the server.
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // Setting the current user and managing token timestamps.
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      // Redirecting to the home page after successful sign-in.
      history.push("/");
    } catch (err) {
      // Handling errors and updating the state with error messages.
      console.error('Error submitting form:', err);
      setErrors(err.response?.data || {});
    }
  };

  // Function to handle changes in form input fields.
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // JSX structure for the sign-in form.
  return (
    <Container
      className={`${styles.FormContainer} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center text-center mb-5 mx-2`}>
        {/* Heading for the sign-in form */}
        <h1 className={appStyles.Header}>Welcome to Forget Me Not</h1>
      </Row>
      <Row className={`${styles.Row} d-flex justify-content-center`}>
        {/* Form component for user sign-in */}
        <Form onSubmit={handleSubmit} className={styles.Form}>
          <Form.Group controlId="username">
            {/* Input field for username */}
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

          {/* Input field for password */}
          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            // Displaying warnings for password errors, if any.
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          {/* Submission button */}
          <Col className="d-flex justify-content-center">
            <Button className={btnStyles.Button} type="submit">
              Sign In
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

export default SignInForm;
