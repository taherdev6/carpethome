import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  // add to cart
  const addToCart = (id, color, colorHex, amount, product, size) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, colorHex, amount, product, size },
    });
  };

  // remove item form cart
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toggle item

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  // clear cart

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
