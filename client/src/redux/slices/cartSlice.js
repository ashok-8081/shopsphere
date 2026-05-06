import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";
import { UNSAFE_LocationContext } from "react-router-dom";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.totalItems = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0,
      );
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      state.totalItems = state.cartItems.reduce(
        (acc, item) => acc + item.qty,
        0,
      );
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
