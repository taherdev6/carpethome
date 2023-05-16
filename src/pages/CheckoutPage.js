import React from 'react';
import styled from 'styled-components';
import { PageHero, MoyasarCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length === 0 ? (
          <div className="empty">
            <h2>Your Cart Is Empty</h2>
            <Link to="/products" className="btn">
              Fill it
            </Link>
          </div>
        ) : (
          <MoyasarCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
