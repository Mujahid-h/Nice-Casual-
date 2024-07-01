import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getUserProfile } from "../../api/userApi";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    userProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  registerRequest,
  registerSuccess,
  registerFail,
  userProfileRequest,
  userProfileSuccess,
  userProfileFail,
} = userSlice.actions;

// Async action creators
export const login = (formData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const data = await loginUser(formData);
    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(loginFail(error.message));
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const data = await registerUser(formData);
    dispatch(registerSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};

export const getUserInfo = () => async (dispatch, getState) => {
  try {
    dispatch(userProfileRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const data = await getUserProfile(userInfo._id); // Adjust according to your API setup
    dispatch(userProfileSuccess(data));
  } catch (error) {
    dispatch(userProfileFail(error.message));
  }
};

export default userSlice.reducer;
