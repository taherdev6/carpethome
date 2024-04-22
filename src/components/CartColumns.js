import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const CartColumns = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div className="content">
        <h5>{t("item")}</h5>
        <h5>{t("price")}</h5>
        <h5>{t("quantity")}</h5>
        <h5>{t("subtotal")}</h5>
        <span></span>
      </div>
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (min-width: 776px) {
    display: block;
    .content {
      display: grid;
      grid-template-columns: 316px 1fr 1fr 1fr auto;
      justify-items: center;
      column-gap: 1rem;
      h5 {
        color: var(--clr-grey-5);
        font-weight: 400;
      }
    }

    span {
      width: 2rem;
      height: 2rem;
    }
    hr {
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  }
`;

export default CartColumns;
