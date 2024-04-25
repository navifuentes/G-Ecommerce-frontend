import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, purchase, formatedCart } from "../services/carts";

const initialState = null;
const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
  },
});
export const { setCart } = cartReducer.actions;

export const initializeCart = (cid) => {
  return async (dispatch) => {
    const cart = await formatedCart(cid);
    dispatch(setCart(cart.payload));
  };
};
export const updateCart = (cid, pid, qty) => {
  return async (dispatch) => {
    await addToCart(cid, pid, qty);
    const cart = await formatedCart(cid);
    dispatch(setCart(cart.payload));
  };
};
export const purchaseCart = (cid, body) => {
  return async (dispatch) => {
    const ticket = await purchase(cid, body);
  };
};

export default cartReducer.reducer;
