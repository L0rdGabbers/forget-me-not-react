import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const RequireAuth = ({ children }) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Redirect to="/signedout" />;
  }

  return <>{children}</>;
};

export default RequireAuth;