import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectUserToken } from "../auth/authSlice";

// InitialState
const initialState = {
  profileData: {} || null,
  profileStatus: "idle",
  profileError: null
}

// Get User Profile
export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile', async (_, thunkAPI) => {
    try {
      // Get token
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');

      // Send request to backend for get user profile
      const res = await axios.get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // If data not present
      if(!res?.data) throw new Error('Error to load profile from backend');
      // Log success data
      console.log('Profile info: ', res.data.data);
      // Return data
      return res.data.data;
    } catch (error) {
      console.log('Erorr to load profile', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error to load profile';
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUserProfileAddress = createAsyncThunk(
  'profile/updateUserProfileAddress', async ({ name, street, city, country, postal_code, phone_number }, thunkAPI) => {
    try {
      // Get token
      const state = thunkAPI.getState();
      const token = selectUserToken(state);
      // Check if token is not represent.
      if(!token) return thunkAPI.rejectWithValue('No received token');
      // Validation
      if (!name || !street || !city || !country || !postal_code || !phone_number) {
        return thunkAPI.rejectWithValue('All fields are required');
      }
      const payload = {
        name,
        street,
        city,
        country,
        postal_code,
        phone_number
      };
      // Send reqeust to backend for update profile.
      const res = await axios.put(`http://localhost:3000/api/users/profile-edit`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if(!res?.data) return thunkAPI.rejectWithValue('Invalid response from server');

      console.log('Updated Data Info-----', res.data);

      return res.data.data;
    } catch (error) {
      console.log('Erorr to updated profile', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Erorr to updated profile';
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // Get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.profileError = null;
        state.profileData = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = state.profileError = action.payload || action.error?.message || 'Failed to load profile';
      })
    // Update profile and address
      .addCase(updateUserProfileAddress.pending, (state) => {
        state.profileStatus = 'loading';
        state.profileError = null;
      })
      .addCase(updateUserProfileAddress.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.profileError = null;
        const updated = action.payload; // { user, address }

        state.profileData = {
          ...updated.user,
          ...updated.address
        };
      })
      .addCase(updateUserProfileAddress.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.payload || action.error?.message || "Failed to updated profile";
      })
  }
})

export default profileSlice.reducer;
export const selectUserProfile = (state) => state.profile.profileData;
export const selectUserProfileStatus = (state) => state.profile.profileStatus;
export const selectUserProfileError = (state) => state.profile.profileError;