import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/carts/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    carts: cartReducer
  }
});

export default store;