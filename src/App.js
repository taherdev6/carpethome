import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
// import styled from 'styled-components';

import {
  Home,
  SingleProduct,
  PrivateRoute,
  GreetingsPrivateRoute,
  Products,
  About,
  Cart,
  Checkout,
  Error,
  AuthWrapper,
  Login,
  Greetings,
  Shipping
} from './pages';

// const Button = styled.button`
//   background: green;
//   color: white;
// `;
function App() {
  return (
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="cart" element={<Cart />} />


          <Route path="shipping" element={<Shipping />} />

          {/* Might Add Later */}
          {/* <Route path="about" element={<About />} /> */}

          <Route path="products" element={<Products />} />

          <Route path="login" element={<Login />} />

          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

<Route
            path="greetings"
            element={
              <GreetingsPrivateRoute>
                <Greetings />
              </GreetingsPrivateRoute>
            }
          />

          <Route path="/products/:id" element={<SingleProduct />}></Route>
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
