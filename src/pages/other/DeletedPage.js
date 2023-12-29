// DeletedPage.js
// Component for displaying a page indicating project deletion.

import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import styles from '../../styles/SignUpInForm.module.css'
import appStyles from '../../App.module.css'
import btnStyles from '../../styles/Button.module.css'

// Component for displaying a page indicating project deletion.
const DeletedPage = () => {
    return (
        <Container
          className={`${styles.FormContainer} d-flex flex-column align-items-center justify-content-center`}
        >
          {/* Heading for the deleted page */}
          <Row className={`d-flex flex-column align-items-center`}>
            <h1 className={appStyles.Header}>Project Deleted</h1>
          </Row>
          {/* Button to navigate back to the homepage */}
          <Row className={`${styles.Row} d-flex justify-content-center`}>
            <Link to="/">
              <Button className={`${btnStyles.Button} ${btnStyles.BigText}`}>
                Click here to return to the homepage
              </Button>
            </Link>
          </Row>
        </Container>
      );
};

// Exporting the DeletedPage component
export default DeletedPage;
