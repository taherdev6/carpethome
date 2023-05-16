import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {useUserContext} from '../context/user_context'
const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  if (!myUser) {
    return <Navigate to="/" />;
  }
  if(!localStorage.getItem('shipping')) {
    return <Navigate to="/shipping" />;
  }
  return children;
};
export default PrivateRoute;
