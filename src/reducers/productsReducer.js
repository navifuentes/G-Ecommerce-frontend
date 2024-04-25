import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  addProduct,
  updateProduct,
  getProduct,
} from "../services/products.js";

const initialState = null;
const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
    addNewProduct(state, action) {
      return [...state, action.payload];
    },
    updateOneProduct(state, action) {
      return state.map((p) =>
        p._id !== action.payload._id ? p : action.payload
      );
    },
  },
});
export const { setProducts, addNewProduct, updateOneProduct } =
  productsReducer.actions;

export const initializeProducts = () => {
  return async (dispatch) => {
    const products = await getProducts();
    dispatch(setProducts(products.payload));
  };
};
export const postProduct = (p) => {
  return async (dispatch) => {
    const result = await addProduct(p);
    dispatch(addNewProduct(result));
  };
};
export const putProduct = (pid, update) => {
  return async (dispatch) => {
    const result = await updateProduct(pid, update);
    console.log("result reducer", result);
    dispatch(updateOneProduct(result));
  };
};

export default productsReducer.reducer;
