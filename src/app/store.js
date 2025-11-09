import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/carts/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import searchTerm from "../features/search/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    carts: cartReducer,
    orders: orderReducer,
    searchTerm: searchTerm
  }
});

export default store;