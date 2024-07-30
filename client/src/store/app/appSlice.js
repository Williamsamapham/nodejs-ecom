import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // When the getCategories action is pending
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });

    // When the getCategories action is fulfilled
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload; // Use action.payload
    });

    // When the getCategories action is rejected
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message; // Use action.error.message
    });
  },
});

export const { setCategories } = appSlice.actions;

export default appSlice.reducer;
