import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation();
  if (localStorage.getItem("pending")) localStorage.removeItem("pending");
  const { cart } = useCartContext();
  if (cart.length === 0) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>{t("cart_empty")}</h2>
          <Link to="/products" className="btn">
            {t("fill_it")}
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
