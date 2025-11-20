import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// InitialState
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
  expiresAt: localStorage.getItem('expiresAt') || null
};

// Performance on User Login
export const loginUser = createAsyncThunk(
  'auth/login', async ({email, password}, thunkAPI) => {
  try {
    // Send Request to API for authenticate user login
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password
    });

    // console.log('Login Reponses: ', res.data);

    // Get user and token from response
    const { user, token } = res.data.data;
    // If res is not present 
    if(!user) return console.log('Login is not successfully!');
    // Check if token is not exist
    if(!token) {
      // Properly reject with a string error
      return thunkAPI.rejectWithValue("No token received from backend");
    }
    // Decode token and get expiry time
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    localStorage.setItem("token", token);
    // console.log('User in auth: ', user);
    return {
      user,
      token,
      expiresAt
    };
  } catch (error) {
    console.log('Error to get login to page: ', error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Error to get login to page";
    return thunkAPI.rejectWithValue(message)    
  }
})

// Performance on User Register 
export const registerUser = createAsyncThunk(
  'auth/register', async ({ name, email, password}, thunkAPI) => {
    try {
      // Send Request to API for register user
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password
      })
      // Check if register not presents
      if(!res.data) return thunkAPI.rejectWithValue('Unable to register user');
            
      // console.log('Register response: ', res.data.data);

      return res.data?.data;
    } catch (error) {
      console.log('Error to register: ', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error to register account";
      return thunkAPI.rejectWithValue(message)
    }
})

// Google signin user
export const googleSigninUser = createAsyncThunk(
  '', async (idToken, thunkAPI) => {
    try {
      // console.log('idToken: ', idToken);
      // Send request to backend for login with google
      const res = await axios.post("http://localhost:3000/api/auth/google/token", { idToken });

      // console.log('Google User data res: ', res.data.data);

      if(!res?.data?.data) return console.log('Invalid API Response');

      // Get user and token from response
      const { user, token } = res.data.data;
      // Check if user is not exist
      if(!user) {
        return thunkAPI.rejectWithValue("Google Login is not successful.");
      };
      // Check if token is not exist
      if(!token) {
        // Properly reject with a string error
        return thunkAPI.rejectWithValue("No token received from backend");
      }

      // Decode token and get expiry time
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      localStorage.setItem("token", token);
      // console.log('Google user auth: ', user);
      return {
        user,
        token,
        expiresAt
      };
    } catch (error) {
      console.log('Google signin is failed: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout from page
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expiresAt');
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        // Set expiresAt time
        localStorage.setItem('expiresAt', action.payload.expiresAt);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed',
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Google signin
      .addCase(googleSigninUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleSigninUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        // Set expiresAt time
        localStorage.setItem('expiresAt', action.payload.expiresAt);
      })
      .addCase(googleSigninUser.rejected, (state, action) => {
        state.status = 'failed',
        state.error = action.payload;
      })
  }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectUserToken = (state) => state.auth.token;