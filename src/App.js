import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import i18next, { i18n } from "i18next";
import { useProductsContext } from "./context/products_context";
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
  Shipping,
} from "./pages";

// const Button = styled.button`
//   background: green;
//   color: white;
// `;
function App() {
  const lang = i18next.language;
  const { changeLng } = useProductsContext();
  useEffect(() => {
    if (localStorage.getItem("lang")) {
      const storedLang = localStorage.getItem("lang");

      changeLng(storedLang);
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="cart" element={<Cart />} />

        <Route path="shipping" element={<Shipping lang={lang} />} />

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
