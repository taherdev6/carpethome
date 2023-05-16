import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const Greetings = () => {

  const navigate = useNavigate()
  const {clearCart, cart} = useCartContext();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id')
  const status = urlParams.get('status')
  const message = urlParams.get('message')
  const amount = urlParams.get('amount')

  const [paymentMessage, setPaymentMessage] = useState(false)
  
  useEffect(() => {
    
  clearCart();
  localStorage.removeItem('pending')
  },[])
  
  const shipping = JSON.parse(localStorage.getItem('shipping'))
  const createPaymentIntent = async () => {
    
    try {
      const data = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ id, status, message, amount, cart, shipping })
      );
      setPaymentMessage(`${data.data.status}, ${data.data.message}`)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {createPaymentIntent()}, [])

  // useEffect(()=> {clearCart()},[paymentMessage])
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
      
    }, 8000)
  }, [paymentMessage])
  if(!paymentMessage) {
    return <p>Loading...</p>
  }
  if(paymentMessage.includes('failed')) {
    return <p>
      Sorry, Payment {paymentMessage} <br />
      Redirecting to Home Page...
    </p>
  }
  return (
    <p>
      Thanks For Shopping, Payment {paymentMessage}<br />
    Redirecting to Home Page...
    </p>
  )
}

export default Greetings