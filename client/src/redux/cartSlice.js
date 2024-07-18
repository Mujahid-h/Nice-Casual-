import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item._id !== action.payload._id || item.size !== action.payload.size
      );
    },
    updateQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
