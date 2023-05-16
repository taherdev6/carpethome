import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const ShippingPage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [render, setRender] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      const fullName = e.target.elements['full-name'].value
      const phoneNumber = Number(e.target.elements['phone-number'].value)
      
      setFullName(fullName)
      setPhoneNumber(phoneNumber)
      localStorage.setItem('shipping', JSON.stringify({fullName, phoneNumber}))
    }
    if(localStorage.getItem('shipping')) {
      const shipping = JSON.parse(localStorage.getItem('shipping'))
      const {fullName} = shipping;
      const {phoneNumber} = shipping
      return <Wrapper>
        <div>
        <h4>FullName: {fullName}</h4>
        <h4>Phone Number: {phoneNumber}</h4>
        <button 
        className='edit-btn'
        // style={{marginLeft:'100px'}}
        onClick={
        () => {
          localStorage.removeItem('shipping')
        setRender(true)
        }
        
      }
      style={{margin:'50px'}}
      >Edit Info</button>
      <Link to='/checkout' className='link'>Proceed to Payment</Link>
      </div>
      </Wrapper>
      
    }
  return (
    <Wrapper>
    <form className='shipping-form' onSubmit={handleSubmit}
    style={{margin:'50px'}}
    >
        <label htmlFor="full-name">Full Name:</label>
        <input type="text" name='full-name' required/>

        <label htmlFor="phone-number" >Whatsapp Phone Number:</label>
        <input type="number" name='phone-number' required/>
        <button type='submit'>
          Save
        </button>
        
    </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    
    width: 50vw;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  div {
    align-self: center;
    width: 50vw;
    margin-left: 10rem;
    /* align-self: center; */
    /* box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07); */
    /* border-radius: 7px; */
    padding: 40px;
  }

  
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  h4{
    margin-left: 50px;
  }
  .link {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
    text-align: center;
    margin-left: 3rem;
  }
  .link:hover {
    filter: contrast(115%);
  }
  .link:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default ShippingPage