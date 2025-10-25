import { createSlice } from "@reduxjs/toolkit";

// InitialState
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export default authSlice.reducer;