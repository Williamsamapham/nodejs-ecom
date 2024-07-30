import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null
  },
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.current = action.payload.userData
      state.token = action.payload.token
    }
    
  },
//   extraReducers: (builder) => {
//     // When the getCategories action is pending
//     builder.addCase(getNewProduct.pending, (state) => {
//       state.isLoading = true;
//     });

//     // When the getCategories action is fulfilled
//     builder.addCase(getNewProduct.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.newProducts = action.payload; // Use action.payload
//     });

//     // When the getCategories action is rejected
//     builder.addCase(getNewProduct.rejected, (state, action) => {
//       state.isLoading = false;
//       state.errorMessage = action.error.message; // Use action.error.message
//     });
//   },
});

export const {register} = userSlide.actions
export default userSlide.reducer;
