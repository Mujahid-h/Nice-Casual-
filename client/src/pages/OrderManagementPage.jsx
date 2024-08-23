import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../api/orderApi";
import { useSelector } from "react-redux";

const OrderManagementPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const token = userInfo.token;
  const orderId = id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(orderId, token);
        setOrder(data);
        setStatus(data.status);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus(orderId, status, token);
      alert("Order status updated successfully");
    } catch (err) {
      alert(
        `Failed to update order status: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 my-12 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <div className="mt-2">
          <p>
            <strong>Customer:</strong> {order.user.name}
          </p>
          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Items</h3>
        <div className="mt-2">
          {order.items.map((item) => (
            <div key={item.product} className="border-b py-2">
              <p>
                <strong>Product:</strong> {item.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Size:</strong> {item.size || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Shipping Details</h3>
        <div className="mt-2">
          <p>
            <strong>Address:</strong> {order.shippingDetails.address1},{" "}
            {order.shippingDetails.city}, {order.shippingDetails.state},{" "}
            {order.shippingDetails.country}
          </p>
          <p>
            <strong>Phone:</strong> {order.shippingDetails.phone1},{" "}
            {order.shippingDetails.phone2}
          </p>
          <p>
            <strong>Total Amount: PKR.{order.totalAmount}</strong>
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 mt-2"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Departed">Departed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleStatusUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Status
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-100 hover:bg-gray-200 border text-black-100 hover:text-blue-600 font-semibold px-4 py-2 rounded"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default OrderManagementPage;
