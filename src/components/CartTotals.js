import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartTotals = () => {
  const { t } = useTranslation();
  const { total_amount, shipping_fee } = useCartContext();
  const { myUser } = useUserContext();
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            {t("subtotal")} : <span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            {t("shipping_fee")} : <span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            {t("order_total")} :{" "}
            <span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>
        {myUser ? (
          <Link to="/shipping" className="btn">
            {t("proceed_to_checkout")}
          </Link>
        ) : (
          <Link type="button" className="btn" to="/login">
            {t("login")}
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
