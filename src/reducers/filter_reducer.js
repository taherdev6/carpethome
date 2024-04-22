import i18next from "i18next";
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

import ColorNamer from "color-namer";
const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const prices = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...prices);
    let tempProducts = [...action.payload];

    return {
      ...state,
      all_products: [...tempProducts],
      filtered_products: [...tempProducts],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    const products = [...filtered_products];
    // const productNames = products.map((product) => product.name);
    const lang = i18next.language;
    if (sort === "name-a") {
      const sortedProducts = products.toSorted((a, b) => {
        return a.name.localeCompare(b.name, lang);
      });
      return { ...state, filtered_products: sortedProducts };
    }
    if (sort === "name-z") {
      const sortedProducts = products.toSorted((a, b) => {
        return b.name.localeCompare(a.name, lang);
      });
      return { ...state, filtered_products: sortedProducts };
    }
    if (sort === "price-lowest") {
      const newProducts = products.toSorted((a, b) => {
        return a.price - b.price;
      });
      return { ...state, filtered_products: newProducts };
    }
    if (sort === "price-highest") {
      const newProducts = products.toSorted((a, b) => {
        return b.price - a.price;
      });
      return { ...state, filtered_products: newProducts };
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;

    let tempProducts = [...all_products];

    let multicolor = false;
    if (state.filters.color.includes(" ")) {
      multicolor = state.filters.color.split(" ").map((color) => {
        return ColorNamer(color).ntc[0].name.toLowerCase().replaceAll(" ", "");
      });
      multicolor = multicolor.join("and");
    }
    tempProducts = tempProducts.filter((product) => {
      if (
        (state.filters.text === "" ||
          product.name.substring(0, state.filters.text.length) ===
            state.filters.text) &&
        product.price <= state.filters.price &&
        //Might Add In The Future
        // (state.filters.category === 'all' ||
        //   product.category === state.filters.category) &&
        (state.filters.color === "all" ||
          (multicolor
            ? product[`${multicolor}smallstock`] > 0 ||
              product[`${multicolor}largestock`] > 0
            : product[
                `${ColorNamer(state.filters.color)
                  .ntc[0].name.toLowerCase()
                  .replaceAll(" ", "")}smallstock`
              ] > 0 ||
              product[
                `${ColorNamer(state.filters.color)
                  .ntc[0].name.toLowerCase()
                  .replaceAll(" ", "")}largestock`
              ] > 0)) &&
        (state.filters.fabric === "all" ||
          product.fabric === state.filters.fabric) &&
        (state.filters.shipping === false ||
          product.shipping === state.filters.shipping)
      ) {
        return product;
      }
    });
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
