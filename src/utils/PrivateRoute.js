import { Navigate } from 'react-router-dom';
import React from 'react';
import { getUserSession } from './sesion';

const PrivateRoute = ({ children }) => {
  const userSession = getUserSession();
  if (userSession.user.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
