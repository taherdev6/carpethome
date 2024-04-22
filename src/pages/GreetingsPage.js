import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/cart_context";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

import { getAuth } from "@firebase/auth";
import { useTranslation } from "react-i18next";
const Greetings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearCart, cart } = useCartContext();
  const { myUser } = useUserContext();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const status = urlParams.get("status");
  const message = urlParams.get("message");
  const amount = urlParams.get("amount");

  const [paymentMessage, setPaymentMessage] = useState(false);

  useEffect(() => {
    localStorage.removeItem("pending");
  }, []);

  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const createPaymentIntent = async () => {
    try {
      if (!myUser) return;
      const email = myUser.email;
      const data = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify({ id, status, message, amount, cart, shipping, email })
      );

      clearCart();
      setPaymentMessage(`${t(data.data.status)}, ${data.data.message}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createPaymentIntent();
  }, [myUser]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 8000);
  }, [paymentMessage]);
  if (!paymentMessage) {
    return (
      <p
        style={{
          textAlign: "center",
          lineHeight: "50px",
          fontWeight: "bold",
          marginTop: "5rem",
        }}
      >
        {t("loading")}
      </p>
    );
  }
  if (paymentMessage.includes("failed")) {
    return (
      <p
        style={{
          textAlign: "center",
          lineHeight: "50px",
          fontWeight: "bold",
          marginTop: "5rem",
        }}
      >
        {t("payment_failed")}
        <br />
        {t("payment")}, paymentMessage
      </p>
    );
  }
  return (
    <p
      style={{
        textAlign: "center",
        lineHeight: "50px",
        fontWeight: "bold",
        marginTop: "5rem",
      }}
    >
      {t("payment_successful")}
      <br />
      {t("payment")} {paymentMessage}
    </p>
  );
};

export default Greetings;
