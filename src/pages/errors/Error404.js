import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'

import styles from '../../styles/NotLoggedIn.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

const Error404 = () => {
    const history = useHistory();


    const handleSignUpLink = () => {
      history.push('/signup')
    }
    const handleSignInLink = () => {
      history.push('/signin')
    }
    return (
    <Container
      className={`${styles.Container} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center my-5`}>
        <h1 className={appStyles.Header}>Error 404: This page does not exist</h1>
      </Row>
      <Row className={`d-flex justify-content-center`}>
        <Button className={btnStyles.Button} onClick={handleSignUpLink}>
          Sign Up Here
        </Button>
      </Row>
      <Row className={`d-flex justify-content-center`}>
        <Button className={btnStyles.Button} onClick={handleSignInLink}>
          Sign In To Your Account
        </Button>
      </Row>
    </Container>
  );
}

export default Error404