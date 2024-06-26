import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import ColorNamer from "color-namer";
import { useTranslation } from "react-i18next";

const Filters = () => {
  const { t } = useTranslation();
  const {
    filters: {
      text,
      category,
      fabric,
      color,
      max_price,
      min_price,
      shipping,
      price,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const products = [...all_products];

  // const categories = getUniqueValues(all_products, 'category');
  const fabrics = getUniqueValues(all_products, "fabric");
  const colors = getUniqueValues(all_products, "colors");

  const productsMultiColor = products.filter((product) =>
    product.hasOwnProperty("multicolor")
  );
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* {search input} */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder={t("search")}
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* {end of input} */}

          {/* {categories } */}
          {/* <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((cat, i) => {
                return (
                  <button
                    key={i}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                    className={`${
                      category === cat.toLowerCase() ? 'active' : null
                    }`}
                    style={{}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div> */}
          {/* {end of categories
          } */}

          {/* {companies
          } */}

          <div className="form-control">
            <h5>fabric</h5>
            <select
              name="fabric"
              value={fabric}
              onChange={updateFilters}
              className="company"
            >
              {fabrics.map((f, i) => {
                return (
                  <option key={i} value={f}>
                    {f}
                  </option>
                );
              })}
            </select>
          </div>
          {/* {end of companies
          } */}

          {/* {colors
          } */}
          <div className="form-control">
            <div className="colors">
              {colors.map((c, i) => {
                if (c === "all")
                  return (
                    <button
                      key={i}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                      style={{
                        backgroundColor: "#696969",
                        // backgroundColor: 'rgba(0, 0, 0, 0.28)',
                        color: "#fff",
                      }}
                    >
                      all
                    </button>
                  );

                return (
                  <button
                    key={i}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}

              {productsMultiColor.map((product) => {
                return product.multicolor.map((multicolor, i) => {
                  return (
                    <button
                      name="color"
                      className={`multi-color-btn ${
                        multicolor === color ? "active-multi" : ""
                      }`}
                      key={i}
                      data-color={multicolor}
                      onClick={updateFilters}
                    >
                      {multicolor.split(" ").map((color, i) => {
                        return (
                          <a
                            key={i}
                            className="color-btn"
                            style={{ backgroundColor: color }}
                            name="color"
                            data-color={multicolor}
                            onClick={updateFilters}
                          ></a>
                        );
                      })}
                    </button>
                  );
                });
              })}

              {
                // <button className="multi-color-btn">
                //   <span
                //     className="color-btn"
                //     style={{ backgroundColor: 'green' }}
                //   ></span>
                //   <FaPlus className="plus-icon" />
                //   <span
                //     className="color-btn"
                //     style={{ backgroundColor: 'blue' }}
                //   ></span>
                // </button>
              }
            </div>
          </div>
          {/* {end of colors
          } */}

          {/* {price
          } */}

          <div className="form-control">
            <h5>{t("price")}</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>

          {/* {end of price
          } */}

          {/* {shipping
          } */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* {end of shipping
          } */}
        </form>

        <button type="button" className="clear-btn" onClick={clearFilters}>
          {t("clear_filters")}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    border: none;
    background: transprent;

    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
    background-color: #696969;
    /* background-color: rgba(0, 0, 0, 0.28); */
    border-radius: 30px;
    padding: 0.5rem;
    /* background-color: #282828; */
    flex-wrap: wrap;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;

    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }

  .multi-color-btn {
    display: flex;
    border-radius: 15px;
    padding: 0.1rem;
    padding-top: 0.3rem;
    padding-left: 0.5rem;
    padding-bottom: 0.3rem;
    border-style: solid;
    border-color: #222;
    border-width: 0.15rem;
    background-color: #696969;
    cursor: pointer;
    opacity: 0.75;
  }
  .active-multi {
    opacity: 1;
  }
  .plus-icon {
    padding-right: 0.2rem;
    color: #222;
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
