import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: 'idle', // For normal product status
  error: null,
  selectedItems: [],
  selectedItemStatus: 'idle', // For product details status
  selectedItemError: null, 
  recommendItems: [],
  recommendItemStatus: 'idle', // For recommended product status
  recommendItemError: null,
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
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', async (_, thunkAPI) => {
    try {
      // Send a request to backend to fetching products
      const res = await axios.get('http://localhost:3000/api/products');

      if(!res) return new Error('Failed to fetched all products');

      // console.log('Data---', res.data.data);

      return res.data.data;
    } catch (error) {
      console.log('Error Message: ', error);
      return thunkAPI.rejectWithValue("Failed to fetched all products from backend: ", error);
    }
  }
);

export const getProductDetailById = createAsyncThunk(
  'products/getProductDetailById', async ({id}, thunkAPI) => {
    try {
      // Send a request to backend to get product by id
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);

      if(!res) return new Error(`Failed to get product with id:${id}`);

      console.log('Product Details: ', res.data.data);

      return res.data.data;
    } catch (error) {
      console.log(`Error to get product details with id:${id} -`, error);
      return thunkAPI.rejectWithValue('Error to get product details by id', error);
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
    // Recommended Product fetching
      .addCase(recommendedProducts.pending, (state) => {
        state.recommendItemStatus = 'loading';
        state.recommendItemError = null;
      })
      .addCase(recommendedProducts.fulfilled, (state, action) => {
        state.recommendItemStatus = 'succeeded';
        state.recommendItemError = null;
        state.recommendItems = action.payload;
      })
      .addCase(recommendedProducts.rejected, (state, action) => {
        state.recommendItemStatus = 'failed';
        state.recommendItemError = action.payload
      })
    // All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
    // Get Product Details with id
      .addCase(getProductDetailById.pending, (state) => {
        state.selectedItemStatus = 'loading';
        state.selectedItemError = null;
      })
      .addCase(getProductDetailById.fulfilled, (state, action) => {
        state.selectedItemStatus = 'succeeded';
        state.selectedItemError = null;
        state.selectedItems = action.payload;
      })
      .addCase(getProductDetailById.rejected, (state, action) => {
        state.selectedItemStatus = 'failed';
        state.selectedItemError = action.payload;
      })
  }
})

export default productsSlice.reducer;
export const selectRecommendedProducts = (state) => state.products.recommendItems;
export const selectRecommendedProductStatus = (state) => state.products.recommendItemStatus;
export const selectRecommendedProductError = (state) => state.products.recommendItemError;
export const selectAllProductStatus = (state) => state.products.status;
export const selectAllProductError = (state) => state.products.error;
export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (state) => state.products.selectedItems;