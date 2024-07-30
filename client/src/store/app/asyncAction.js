import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCategories = createAsyncThunk(
  "app/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetCategory();
      if (!response.success) {
        // If the response is not successful, reject with a value
        return rejectWithValue(response.error || "An error occurred");
      }
      // If the response is successful, return the data
      return response.getProductCategory;
    } catch (error) {
      // Handle any errors that occurred during the API call
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
