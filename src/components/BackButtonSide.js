import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import styles from '../styles/Button.module.css'

const BackButtonSide = () => {
  const [ componentsLoaded,setComponentsLoaded ] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    history.goBack();
  };

  const shouldRenderButton =
    location.pathname !== '/' &&
    !location.pathname.startsWith('/error') &&
    !location.pathname.startsWith('/deleted');

  useEffect(() => {
    setComponentsLoaded(false);
    setTimeout(() => {
      setComponentsLoaded(true);
    }, 700);
  }, [location.pathname]);
  


  return shouldRenderButton ? (
    <div>
      {componentsLoaded && (
        <Button variant="secondary" className={`${styles.Button} ${styles.BackButton}`} onClick={handleGoBack}>
          Go Back
        </Button>
      )}
    </div>
  ) : null;
};

export default BackButtonSide;