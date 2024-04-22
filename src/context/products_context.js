import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CHANGE_LNG,
} from "../actions";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product: {
    name: "",
    price: "",
    stock: "",
    stars: "",
    description: "",
    reviews: "",
    id: "",
    fabric: "",
    images: "",
    multicolor: [],
    pinksmallstock: "",
    pinklargestock: "",

    whitesmallstock: "",
    whitelargestock: "",

    brandypunchsmallstock: "",
    brandypunchlargestock: "",

    graysmallstock: "",
    graylargestock: "",

    brownsmallstock: "",
    brownlargestock: "",

    creamsmallstock: "",
    creamlargestock: "",

    bluesmallstock: "",
    bluelargestock: "",

    greensmallstock: "",
    greenlargestock: "",

    blacksmallstock: "",
    blacklargestock: "",

    bondibluesmallstock: "",
    bondibluelargestock: "",

    greenandbrandypunchsmallstock: "",
    greenandbrandypunchlargestock: "",

    grayandbluesmallstock: "",
    grayandbluelargestock: "",

    blueandbrandypunchsmallstock: "",
    blueandbrandypunchlargestock: "",
  },
  single_product_loading: false,
  single_product_error: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const changeLng = (lng) => {
    dispatch({ type: CHANGE_LNG, payload: lng });
  };

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const data = await axios.get(url);

      if (data.status === 200) {
        const res = data.data;

        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: res });
      } else {
        throw new Error("Error!");
      }
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      if (!res.status) {
        throw new Error("Error: Could Not Fetch Product");
      }
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        changeLng,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
