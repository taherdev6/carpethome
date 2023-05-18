import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

import { getAuth } from '@firebase/auth';
const Greetings = () => {

  const navigate = useNavigate()
  const {clearCart, cart} = useCartContext();
  const {myUser} = useUserContext()
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id')
  const status = urlParams.get('status')
  const message = urlParams.get('message')
  const amount = urlParams.get('amount')


  const [paymentMessage, setPaymentMessage] = useState(false)
  
  
  useEffect(() => {
    
  localStorage.removeItem('pending')
  },[])
  
  const shipping = JSON.parse(localStorage.getItem('shipping'))
  const createPaymentIntent = async () => {
    
    try {
      if(!myUser) return
      const email = myUser.email
      console.log(myUser.email, email)
      const data = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ id, status, message, amount, cart, shipping, email })
      );
      
      clearCart()
      setPaymentMessage(`${data.data.status}, ${data.data.message}`)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {createPaymentIntent()}, [myUser])

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
      
    }, 8000)
  }, [paymentMessage])
  if(!paymentMessage) {
    return <p style={{textAlign:'center', lineHeight:'50px', fontWeight:'bold', marginTop:'5rem'}}>Loading...</p>
  }
  if(paymentMessage.includes('failed')) {
    return <p style={{textAlign:'center', lineHeight:'50px', fontWeight:'bold', marginTop:'5rem'}}>
      Sorry, Payment {paymentMessage} <br />
      Redirecting to Home Page...
    </p>
  }
  return (
    <p style={{textAlign:'center', lineHeight:'50px', fontWeight:'bold', marginTop:'5rem'}}>
      Thanks For Shopping, Payment {paymentMessage}<br />
    Redirecting to Home Page...
    </p>
  )
}

export default Greetings