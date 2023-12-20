import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import styles from '../styles/Button.module.css'

const BackButtonBottom = () => {
  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    history.goBack();
  };

  const shouldRenderButton =
    location.pathname !== '/' &&
    !location.pathname.startsWith('/error') &&
    !location.pathname.startsWith('/deleted');

  return shouldRenderButton ? (
    <div className='d-flex justify-content-center'>
      <Button variant="secondary" className={`${styles.Button} ${styles.BackButtonBottom}`} onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  ) : null;
};

export default BackButtonBottom;