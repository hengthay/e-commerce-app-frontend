import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  selectedItems: [],
  recommendItems: []
};

// Performance on recommended product
export const recommendedProducts = createAsyncThunk(
  'products/recommendedProducts', async (type, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/recommend-products`);

      if(!res) return new Error('Error to get products');

      // console.log('Data', res.data.data);

      return res.data.data;

    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to fetched products from backend: ", error);
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendedProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(recommendedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.recommendItems = action.payload;
      })
      .addCase(recommendedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })
  }
})

export default productsSlice.reducer;
export const selectRecommendedProducts = (state) => state.products.recommendItems;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;