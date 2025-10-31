import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken } from "../auth/authSlice";

const initialState = {
  cartItems: [],
  cartItemsStatus: 'idle',
  cartItemsError: null,
  // Guest Carts
  cartTempItems: JSON.parse(localStorage.getItem('cartTemp')) || [],
  deliveryFee: 0
}

// Fetch carts for logged user
export const fetchCarts = createAsyncThunk(
  'carts/fetchCarts', async (_, thunkAPI) => {
    try {
      // Get user token from state
      const state = thunkAPI.getState();
      const token = selectUserToken(state);

      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send request to backend from retrieval carts
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: {Authorization: `Bearer ${token}`}
      });

      if(!res) return new Error('Error to receive carts items from backend');

      // console.log('Cart Items: ', res.data.data.items);

      return res.data.data.items;
    } catch (error) {
      console.log('Error to get carts: ', error);
      return thunkAPI.rejectWithValue('Error to get carts: ', error);
    }
  }
)

// Implement on Add to Cart function
export const addToCart = createAsyncThunk(
  'carts/addToCart', async ({productId, quantity}, thunkAPI) => {
    try {
       // Get user token from state
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send a data to backend for performance add to cart
      const addProduct = await axios.post('http://localhost:3000/api/cart/add', {
        product_id: productId,
        quantity
      }, {
        headers: {Authorization: `Bearer ${token}`}
      });

      if(!addProduct) return new Error('Failed to add a product to cart');

      console.log('Added Product to Cart Successful', addProduct.data);

      // ✅ Fetch the full cart after adding
      const res = await axios.get('http://localhost:3000/api/cart', { headers: {Authorization: `Bearer ${token}`}}
      );

      return res.data.data.items;
    } catch (error) {
      console.log('Error to add product to cart: ', error);
      return thunkAPI.rejectWithValue('Error to add to cart: ', error);
    }
  }
)

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // Load the guest cart from localStorage to display for them
    loadGuestCarts: (state) => {
      state.cartTempItems = JSON.parse(localStorage.getItem('cartTemp')) || [];
    },
    addGuestItems: (state, action) => {
      // Get cart from payload
      const item = action.payload;
      // Find existing items in cart
      const existingItem = state.cartTempItems.find((i) => i.id === item.id);
      // If existing we increase quantity, otherwise we add new one
      if(existingItem) {
        existingItem.quantity += 1;
      }else {
        state.cartTempItems.push(item);
      }

      // Update localStorage
      localStorage.setItem('cartTemp', JSON.stringify(state.cartTempItems));
    }
  },
  extraReducers: (builder) => {
    builder
    // Fetch carts
      .addCase(fetchCarts.pending, (state) => {
        state.cartItemsStatus = 'loading';
        state.cartItemsError = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.cartItemsStatus = 'succeeded';
        state.cartItemsError = null;
        state.cartItems = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.cartItemsStatus = 'failed';
        state.cartItemsError = action.payload;
      })
    // Performance on add to cart function
      .addCase(addToCart.pending, (state) => {
        state.cartItemsStatus = 'loading';
        state.cartItemsError = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItemsStatus = 'succeeded';
        state.cartItemsError = null;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartItemsStatus = 'failed';
        state.cartItemsError = action.payload;
      })
  }
})

export default cartSlice.reducer;
export const { loadGuestCarts, addGuestItems } = cartSlice.actions;
export const selectAllCartItems = (state) => state.carts.cartItems;
export const selectCartItemsStatus = (state) => state.carts.cartItemsStatus;
export const selectCartItemsError = (state) => state.carts.cartItemsError;
export const selectCartDelivery = (state) => state.carts.deliveryFee;
export const selectCartTempItems = (state) => state.carts.cartTempItems;

// Select cart quantity
export const selectCartItemsQuantity = (state) => {
  // Get token from auth
  const token = state.auth.token;
  const items = token ? state.carts.cartItems : state.carts.cartTempItems;

  return items.reduce((total, item) => total + (item.quantity || 1), 0);
}
// Subtotal price
// Memoized subtotal
export const selectCartSubtotal = createSelector(
  [selectAllCartItems, selectCartTempItems, (state) => state.auth.token],
  (cartItems, cartTempItems, token) => {
    const items = token ? cartItems : cartTempItems;
    if (!Array.isArray(items) || items.length === 0) return 0;

    return items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }
);

// export const selectCartTotal = (state) => {
//   const token = state.auth.token;
//   const items = token ? state.carts.cartItems : state.carts.cartTempItems;
//   // Subtotal
//   const subtotal = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
//   // Get delivery price
//   const delivery = state.carts.deliveryFee;

//   return {
//     subtotal,
//     delivery,
//     total: subtotal + delivery
//   };
// }