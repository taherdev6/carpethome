import React, { useState } from 'react'
import StyledFirebaseAuth from '../components/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import { useUserContext } from '../context/user_context'
import { Navigate } from 'react-router-dom'


  const uiConfig = {
     
  signInFlow: 'popup',
  
  signInSuccessUrl: '/',
  
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  }
const LoginPage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
    const {myUser} = useUserContext();
    
  
    
    if(myUser) {
        return <Navigate to='/'/>
    }
  return (
    <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    </div>
  )
}

export default LoginPage