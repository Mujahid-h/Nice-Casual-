import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/auth`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Invalid credentials", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    throw error.response?.data?.message || "Login failed";
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error.response?.data?.message || "Fetching profile failed";
  }
};

export const updateUserProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${API}/auth/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error.response?.data?.message || "Updating profile failed";
  }
};

export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data?.message || "Fetching users failed";
  }
};

export const deleteUser = async (id, token) => {
  try {
    const response = await axios.delete(`${API}/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response?.data?.message || "Deleting user failed";
  }
};

export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${API}/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error.response?.data?.message || "Fetching user by ID failed";
  }
};

export const updateUser = async (id, userData, token) => {
  try {
    const response = await axios.put(`${API}/auth/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error.response?.data?.message || "Updating user failed";
  }
};

export const checkAuthStatus = async () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    // You might want to validate the token with your backend here
    // For now, we'll just return the stored user info
    return parsedUserInfo;
  }
  return null;
};
