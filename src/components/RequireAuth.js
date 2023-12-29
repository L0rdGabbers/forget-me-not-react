// RequireAuth.js
// Ensures that only authenticated users can access restricted content.
import React from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Error404 from '../pages/errors/Error404';

const RequireAuth = ({ children }) => {
  const currentUser = useCurrentUser();

  // If there is no currentUser value, the user is sent to the Error 404 page.
  if (!currentUser) {
    return <Error404 />;
  }

  // If the page requires user authentication and the user is signed out, they will be sent to the Error 404 page.
  return <>{children}</>;
};

export default RequireAuth