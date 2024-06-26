import React from "react";
import { useFilterContext } from "../context/filter_context";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
const Sort = () => {
  const { t } = useTranslation();
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
    updateSort,
    sort,
  } = useFilterContext();
  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={grid_view ? "active" : null}
          onClick={() => setGridView()}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={!grid_view ? "active" : null}
          onClick={() => setListView()}
        >
          <BsList />
        </button>
      </div>
      <p>
        {products.length} {t("products_found")}
      </p>
      <hr />
      <form>
        <label htmlFor="sort">{t("sort")}</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={(e) => updateSort(e)}
        >
          <option value="price-lowest">{t("sort_price_lowest")}</option>
          <option value="price-highest">{t("sort_price_highest")}</option>
          <option value="name-a">{t("sort_name_a-z")}</option>
          <option value="name-z">{t("sort_name_z-a")}</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
