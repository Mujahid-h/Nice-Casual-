import axios from "axios";

export const createOrder = async (orderData) => {
  const response = await axios.post("/api/orders", orderData);
  return response.data;
};

export const getOrders = async (token) => {
  const response = await axios.get("/api/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(
    `/api/orders/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
