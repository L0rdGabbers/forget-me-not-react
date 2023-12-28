import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation } from "react-router-dom";

import styles from "../styles/Button.module.css";

const BackButtonBottom = () => {
  const [ componentsLoaded, setComponentsLoaded ] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    history.goBack();
  };

  const shouldRenderButton =
    location.pathname !== "/" &&
    !location.pathname.startsWith("/error") &&
    !location.pathname.startsWith("/deleted");

  useEffect(() => {
    setComponentsLoaded(false);
    setTimeout(() => {
      setComponentsLoaded(true);
    }, 700);
  }, [location.pathname]);

  return shouldRenderButton ? (
    <div className="d-flex justify-content-center">
      {componentsLoaded && (
        <Button
          variant="secondary"
          className={`${styles.Button} ${styles.BackButtonBottom}`}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      )}
    </div>
  ) : null;
};

export default BackButtonBottom;
