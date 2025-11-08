import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectUserToken } from "../auth/authSlice";

// InitialState
const initialState = {
  orderItems: [],
  orderItemsStatus: 'idle',
  orderItemsError: null,
};

// Place order
export const placeOrder = createAsyncThunk(
  'orders/placeOrder', async (address, thunkAPI) => {
    try {
      // Get data from body
      const { street, city, country, postal_code, phone_number } = address;

      console.log(`Receive Address of Order St-${street}, City-${city}, Country-${country}, Postal-code-${postal_code} and Phone-number-${phone_number}`)

      // Get user token from state
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send request to backend to make a place order
      const res = await axios.post(`http://localhost:3000/api/orders/checkout`, {street, city, country, postal_code, phone_number}, { headers: {Authorization: `Bearer ${token}`} });

      if(!res) return new Error('Error to place order');

       // HandleResponse wrapper pattern
      const backendData = res.data.data || res.data;
      console.log("✅ placeOrder backendData:", backendData);

      // Return only the important payload (stripe + order)
      return {
        order: backendData.order,
        stripe: backendData.stripe,
      };
    } catch (error) {
      console.log('Error to make place order: ', error);
      return thunkAPI.rejectWithValue('Error to make a place order: ', error);
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderItemsStatus = 'loading';
        state.orderItemsError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderItemsStatus = 'succeeded';
        state.orderItemsError = null;
        state.orderItems = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderItemsStatus = 'failed';
        state.orderItemsError = action.payload;
      })
  }
});

export default orderSlice.reducer;
export const selectAllOrderItems = (state) => state.orders.orderItems;
export const selectOrderItemsStatus = (state) => state.orders.orderItemsStatus;
export const selectOrderItemsError = (state) => state.orders.orderItemsError;