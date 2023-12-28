import React from 'react'
import styles from '../../styles/NotLoggedIn.module.css'
import appStyles from "../../App.module.css"
import btnStyles from "../../styles/Button.module.css"
import { Row, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const NotLoggedInPage = () => {
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
        <h1 className={appStyles.Header}>Logged In Users Only</h1>
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

export default NotLoggedInPage