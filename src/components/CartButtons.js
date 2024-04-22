import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CartButtons = () => {
  const { closeSidebar, changeLng } = useProductsContext();
  const { total_items, clearCart } = useCartContext();
  const { myUser, app } = useUserContext();
  const { t } = useTranslation();
  const lang = i18next.language;
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={() => closeSidebar()}>
        {t("cart")}
        <span
          className={`cart-container ${
            i18next.language === "ar" && "margin-right"
          }`}
          // {i18next.language === "ar" && { marginLeft: "1rem" }}
        >
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
      {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            clearCart();
            app.auth().signOut();
          }}
        >
          {" "}
          {t("logout")} <FaUserMinus />
        </button>
      ) : (
        <Link to="/login" className="auth-btn" onClick={() => closeSidebar()}>
          {t("login")} <FaUserPlus />
        </Link>
      )}

      <div className="lng-container">
        <button
          className="lng-btn"
          onClick={() => {
            changeLng("en");
            localStorage.setItem("lang", "en");
          }}
        >
          EN
        </button>
        /
        <button
          className="lng-btn"
          onClick={() => {
            changeLng("ar");
            localStorage.setItem("lang", "ar");
          }}
        >
          العربية
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 380px;
  @media (max-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 250px;
  }

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
    @media (max-width: 430px) {
      font-size: 1rem;
    }
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-3);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    @media (max-width: 430px) {
      font-size: 1rem;
    }
    svg {
      margin-left: 5px;
    }
    margin-right: 1.3rem;
  }

  .lng-btn {
    border: none;
    background: transparent;
    padding: 3px;
    cursor: pointer;
  }

  .margin-right {
    margin-right: 1rem;
  }
`;
export default CartButtons;
