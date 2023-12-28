import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Error404 from '../pages/errors/Error404';

const RequireAuth = ({ children }) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Error404 />;
  }

  return <>{children}</>;
};

export default RequireAuth