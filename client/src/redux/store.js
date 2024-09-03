import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSLice from "./cartSlice";
import orderSLice from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSLice,
    order: orderSLice,
  },
});

export default store;
