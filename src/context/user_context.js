import React, { useContext, useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { getAuth } from '@firebase/auth';

const UserContext = React.createContext();


export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const [paymentPending, setPaymentPending] = useState(false)
  // const handlePending = () => {
  //   setPaymentPending(true)
  //   return {}
  // }
  


  const config = {apiKey: process.env.REACT_APP_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_AUTH_APP_ID}
    const app = firebase.initializeApp(config)
    
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if(user) {
        
      setMyUser(user)
      } else{
        setMyUser(null)
      }
    })
    console.log(myUser)
   


  return (
    <UserContext.Provider value={{  myUser, setMyUser, paymentPending, app }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
