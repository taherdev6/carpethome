import React, { useState } from 'react'
import { useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import { useUserContext } from '../context/user_context'
import { Navigate } from 'react-router-dom'
import { getAuth, sendEmailVerification } from "firebase/auth";


  const uiConfig = {
     // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  }
const LoginPage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
    const {setMyUser, myUser, app} = useUserContext();
    const [message, setMessage] = useState('')
    const auth = getAuth();
  
    
    if(myUser) {
        return <Navigate to='/'/>
    }
  return (
    <div>
          <h4>{message}</h4>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    </div>
  )
}

export default LoginPage