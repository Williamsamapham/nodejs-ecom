import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import productSlide from "./product/productSlide";

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productSlide,
  },
});
