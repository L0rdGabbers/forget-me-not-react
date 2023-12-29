// BackButtonBottom.js
// Provides a button at the bottom of the page for the user to go back to the previous page.
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

  // Ensures that the user is not on the Home page, the error page or the deleted pages.
  const shouldRenderButton =
    location.pathname !== "/" &&
    !location.pathname.startsWith("/error") &&
    !location.pathname.startsWith("/deleted");

  // Delays the rendering of the button to ensure a smoother transition.
  useEffect(() => {
    setComponentsLoaded(false);
    setTimeout(() => {
      setComponentsLoaded(true);
    }, 700);
  }, [location.pathname]);

  // Renders a button at the bottom of the page that allows the user to go back to the previous page.
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
