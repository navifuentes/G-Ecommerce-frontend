import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
