// Error404.js
// Component for displaying a 404 error page.

import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

import styles from '../../styles/Error.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Functional component for displaying the 404 error page.
const Error404 = () => {
    // React Router's history object for programmatic navigation.
    const history = useHistory();

    // Function to handle navigation to the sign-up page.
    const handleSignUpLink = () => {
      history.push('/signup')
    }

    // Function to handle navigation to the sign-in page.
    const handleSignInLink = () => {
      history.push('/signin')
    }

    // JSX structure for the 404 error page.
    return (
    <Container
      className={`${styles.Container} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center my-5`}>
        {/* Heading for the 404 error page */}
        <h1 className={appStyles.Header}>Error 404: This page does not exist</h1>
      </Row>
      {/* Button to navigate to the sign-up page */}
      <Row className={`d-flex justify-content-center`}>
        <Button className={btnStyles.Button} onClick={handleSignUpLink}>
          Sign Up Here
        </Button>
      </Row>
      {/* Button to navigate to the sign-in page */}
      <Row className={`d-flex justify-content-center`}>
        <Button className={btnStyles.Button} onClick={handleSignInLink}>
          Sign In To Your Account
        </Button>
      </Row>
    </Container>
  );
}

export default Error404;
