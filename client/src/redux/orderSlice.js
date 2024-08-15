import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;
