import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { useLocation } from 'react-router-dom';
const GreetingsPrivateRoute = ({ children, ...rest }) => {
    const location = useLocation();
    const {myUser} = useUserContext();
    
    if(location.pathname.includes('greetings') && !localStorage.getItem('pending')) return children
    if(!localStorage.getItem('pending')) {
        return <Navigate to="/" />
    }
  if (!localStorage.getItem('cart') ||JSON.parse(localStorage.getItem('cart')).length === 0) {
    return <Navigate to="/" />;
  }

  return children;
};
export default GreetingsPrivateRoute;