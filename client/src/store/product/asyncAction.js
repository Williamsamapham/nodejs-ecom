import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getNewProduct = createAsyncThunk(
  "product/newProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetProduct({sort: '-createAt'});
      if (!response.success) {
        // If the response is not successful, reject with a value
        return rejectWithValue(response.error || "An error occurred");
      }
      // If the response is successful, return the data
      return response.products;
    } catch (error) {
      // Handle any errors that occurred during the API call
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
