import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import productSlide from "./product/productSlide";
import userSlice from "./user/userSlide";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
};

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productSlide,
    user: persistReducer(userConfig, userSlice)
  },
});
export const persistor = persistStore(store)