import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasPaid: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    paymentSuccess(state) {
      state.hasPaid = true;
    },
    resetPaymentStatus(state) {
      state.hasPaid = false;
    },
  },
});

export const { paymentSuccess, resetPaymentStatus } = orderSlice.actions;
export default orderSlice.reducer;
