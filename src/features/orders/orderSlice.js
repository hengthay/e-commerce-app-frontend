import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectUserToken } from "../auth/authSlice";

// InitialState
const initialState = {
  // Place Order Items
  orderItems: [],
  orderItemsStatus: 'idle',
  orderItemsError: null,
  // Order Items History
  orderItemsHistory: [],
  orderItemsHistoryStatus: 'idle',
  orderItemsHistoryError: null,
  // Order Status
  orderStatusData: null,
  orderStatus: 'idle',
  orderStatusError: null,
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

      if(!res?.data) return thunkAPI.rejectWithValue('Error to place order');

       // HandleResponse wrapper pattern
      const backendData = res?.data?.data || res?.data;
      console.log("✅ placeOrder backendData:", backendData);

      // Return only the important payload (stripe + order)
      return {
        order: backendData.order,
        stripe: backendData.stripe,
      };
    } catch (error) {
      console.log('Error to make place order: ', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error to make place order";
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Get order status
export const getOrderStatus = createAsyncThunk(
  'orders/getOrderStatus', async (orderId, thunkAPI) => {
    try {
      console.log('Order ID: ', orderId, ' Received');

      // Get user token from state
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send request to backend for get order status
      const res = await axios.get(`http://localhost:3000/api/orders/${orderId}/track-order`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const orderData = res?.data?.data;
      if(!orderData) return thunkAPI.rejectWithValue('Invalid Response from API');

      console.log('Order Status Data: ', orderData);

      return orderData;
    } catch (error) {
      console.log('Error to get order status: ', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error to get order status";
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Fetch orders
export const fetchOrdersItem = createAsyncThunk(
  'orders/fetchOrdersItem', async (_, thunkAPI) => {
    try {
      // Get user token from state
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send request to backend for fetching orders
      const res = await axios.get('http://localhost:3000/api/orders/my', {
        headers: { Authorization: `Bearer ${token}`}
      });

      if(!res?.data?.data) return thunkAPI.rejectWithValue('Error to fetch orders');
      console.log('Order Received - ', res.data.data);

      return res.data.data ?? [];
    } catch (error) {
      console.log('Error to fetch order items: ', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error to fetch order items";
      return thunkAPI.rejectWithValue(message);
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
    // Place Order
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
    // Fetch Orders
      .addCase(fetchOrdersItem.pending, (state) => {
        state.orderItemsHistoryStatus = 'loading';
        state.orderItemsHistoryError = null;
      })
      .addCase(fetchOrdersItem.fulfilled, (state, action) => {
        state.orderItemsHistoryStatus = 'succeeded';
        state.orderItemsHistoryError = null;
        state.orderItemsHistory = action.payload;
      })
      .addCase(fetchOrdersItem.rejected, (state, action) => {
        state.orderItemsHistoryStatus = 'failed';
        state.orderItemsHistoryError = 'Failed to fetch your order! Please retry again later.';
      })
    // Get Order Status (tracking)
      .addCase(getOrderStatus.pending, (state) => {
        state.orderStatus = "loading";
        state.orderStatusError = null;
        state.orderStatusData = null;
      })
      .addCase(getOrderStatus.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.orderStatusError = null;
        state.orderStatusData = action.payload;
      })
      .addCase(getOrderStatus.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderStatusError = 'Cannot fetch the order status. Please retry again!';
        state.orderStatusData = null;
      });
  }
});

export default orderSlice.reducer;
export const selectAllOrderItems = (state) => state.orders.orderItems;
export const selectOrderItemsStatus = (state) => state.orders.orderItemsStatus;
export const selectOrderItemsError = (state) => state.orders.orderItemsError;
export const selectAllOrderItemsHistory = (state) => state.orders.orderItemsHistory;
export const selectAllOrderItemsHistoryStatus = (state) => state.orders.orderItemsHistoryStatus;
export const selectAllOrderItemsHistoryError = (state) => state.orders.orderItemsHistoryError;
// New selectors for tracking / order status
export const selectOrderStatusData = (state) => state.orders.orderStatusData;
export const selectOrderStatus = (state) => state.orders.orderStatus;
export const selectOrderStatusError = (state) => state.orders.orderStatusError;