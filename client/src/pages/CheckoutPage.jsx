import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder as apiCreateOrder } from "../api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import DefaultLayout from "../components/DefaultLayout";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    country: "",
    city: "",
    state: "",
    address1: "",
    address2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.18;
    const deliveryCharge = 250;
    const totalAmount = subtotal + tax + deliveryCharge;

    return totalAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate total amount
      const totalAmount = calculateTotalAmount();

      // Prepare order data
      const orderData = {
        items: cartItems,
        shippingDetails,
        paymentMethod: "cash",
        totalAmount,
        status: "Pending",
      };

      // Call the API to create the order
      await apiCreateOrder(orderData, userInfo.token);

      // Clear the cart in localStorage
      dispatch(clearCart());

      // Navigate to success page
      navigate("/success");
    } catch (error) {
      setError(
        "An error occurred while processing your order. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {error && alert(error)}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-2 mb-2">
                <div className="font-medium">{item.name}</div>
                <div>Size: {item.size}</div>
                <div>Price: PKR. {item.price.toFixed(2)}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
            <div className="space-y-2">
              {Object.keys(shippingDetails).map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type="text"
                    value={shippingDetails[key]}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
