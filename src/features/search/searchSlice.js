import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
}

const searchSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchItemName: (state, action) => {
      state.search = action.payload;
    },
    clearSearchItemName: (state) => {
      state.search = "";
    }
  }
})

export default searchSlice.reducer;
export const { setSearchItemName, clearSearchItemName } = searchSlice.actions;
export const selectSearchTerm = (state) => state.searchTerm.search;