import { createSlice } from "@reduxjs/toolkit";
import { getNewProduct } from "./asyncAction";

const productSlide = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // When the getCategories action is pending
    builder.addCase(getNewProduct.pending, (state) => {
      state.isLoading = true;
    });

    // When the getCategories action is fulfilled
    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload; // Use action.payload
    });

    // When the getCategories action is rejected
    builder.addCase(getNewProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message; // Use action.error.message
    });
  },
});

// export const { setCategories } = productSlide.actions;

export default productSlide.reducer;
