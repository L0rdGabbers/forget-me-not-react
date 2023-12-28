import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import styles from '../../styles/NotLoggedIn.module.css'
import appStyles from '../../App.module.css'
const Error500 = () => {
  return (
    <Container
      className={`${styles.Container} d-flex flex-column align-items-center justify-content-center`}
    >
      <Row className={`d-flex flex-column align-items-center my-5`}>
        <h1 className={appStyles.Header}>Error 500</h1>
      </Row>
      <Row className={`d-flex flex-column align-items-center my-5`}>
      <h2 className={appStyles.Header}>Please try visiting our page again later.</h2>
      </Row>
    </Container>
  );
}

export default Error500