import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createOrder as reduxCreateOrder } from "../redux/orderSlice";
import { createOrder as apiCreateOrder } from "../api/orderApi";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const [deliveryDetails, setDeliveryDetails] = useState({
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
  const [paymentMode, setPaymentMode] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      let paymentMethodId = "";
      if (paymentMode === "card") {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        paymentMethodId = paymentMethod.id;
      }

      // Prepare order data
      const orderData = {
        items: cartItems,
        deliveryDetails,
        paymentMode,
        paymentMethodId,
      };

      // Save the order in Redux store
      dispatch(reduxCreateOrder(orderData));
      await apiCreateOrder(orderData, userInfo.token);

      // Clear the cart
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

  // const calculateTotalAmount = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
          <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
          <div className="space-y-2">
            {Object.keys(deliveryDetails).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  value={deliveryDetails[key]}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cash"
              name="paymentMode"
              value="cash"
              checked={paymentMode === "cash"}
              onChange={handlePaymentModeChange}
              className="mr-2"
            />
            <label htmlFor="cash" className="mr-4">
              Cash on Delivery
            </label>
            <input
              type="radio"
              id="card"
              name="paymentMode"
              value="card"
              checked={paymentMode === "card"}
              onChange={handlePaymentModeChange}
              className="mr-2"
            />
            <label htmlFor="card">Credit/Debit Card</label>
          </div>
          {paymentMode === "card" && (
            <div className="mt-4">
              <CardElement className="p-2 border border-gray-300 rounded" />
            </div>
          )}
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
  );
};

export default CheckoutPage;
