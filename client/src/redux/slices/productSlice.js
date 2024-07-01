import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts as getAllProducts,
  getProductById,
} from "../../api/productApi";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    productFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    singleProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    singleProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    singleProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productRequest,
  productSuccess,
  productFail,
  singleProductRequest,
  singleProductSuccess,
  singleProductFail,
} = productSlice.actions;

// Async action creators
export const getProducts = () => async (dispatch) => {
  try {
    dispatch(productRequest());
    const data = await getAllProducts(); // Implement according to your API setup
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.message));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(singleProductRequest());
    const data = await getProductById(id); // Implement according to your API setup
    dispatch(singleProductSuccess(data));
  } catch (error) {
    dispatch(singleProductFail(error.message));
  }
};

export default productSlice.reducer;
