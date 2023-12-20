import React from 'react'
import styles from '../../styles/SignUpInForm.module.css'
import appStyles from '../../App.module.css'

const DeletedPage = () => {
    return (
        <Container
          className={`${styles.FormContainer} d-flex flex-column align-items-center justify-content-center`}
        >
          <Row className={`d-flex flex-column align-items-center`}>
            <h1 className={appStyles.Header}>Welcome to Forget Me Not</h1>
          </Row>
          <Row className={`${styles.Row} d-flex justify-content-center`}>
          </Row>
        </Container>
      );
    };

export default DeletedPage