import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const RequireAuth = ({ children }) => {
  const currentUser = useCurrentUser();

  const isLoading = currentUser === null;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <Redirect to="/loggedout" />;
  }

  return <>{children}</>;
};

export default RequireAuth