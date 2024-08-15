import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import DefaultLayout from "../components/DefaultLayout";

// Load your Stripe public key from environment variables
const stripePromise = loadStripe(
  "pk_test_51PmDTFC80jaTZneL4fsAurFxdPnnynqTznp6aDtarTsaG8YBhynkRaRQhUCjcGDpJ2nbKvOpJnzYTIVOKSVvXy5n00PAvkfzeT"
);

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user); // Adjust according to your userInfo slice
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
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if userInfo is not logged in
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (paymentMethod === "card") {
        if (!stripe || !elements) {
          setError("Stripe has not been loaded properly.");
          return;
        }

        const { error: stripeError, paymentMethod: stripePaymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
          });

        if (stripeError) {
          setError(stripeError.message);
          setIsProcessing(false);
          return;
        }

        const orderData = {
          items: cartItems,
          shippingDetails: deliveryDetails,
          paymentMethod: "card",
          paymentMethodId: stripePaymentMethod.id,
          totalAmount: calculateTotal(),
        };

        await dispatch(createOrder(orderData, userInfo.token));
        dispatch(clearCart());
        navigate("/success");
      } else {
        const orderData = {
          items: cartItems,
          shippingDetails: deliveryDetails,
          paymentMethod: "cod",
          totalAmount: calculateTotal(),
        };

        await dispatch(createOrder(orderData, userInfo.token));
        dispatch(clearCart());
        navigate("/success");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = totalAmount * 0.18;
    const deliveryCharge = 250;
    return totalAmount + tax + deliveryCharge;
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-gray-800 text-center font-bold text-3xl mb-4">
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="bg-gray-200 p-4 rounded mb-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm">Price: PKR {item.price}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
                {item.sizes &&
                  Object.entries(item.sizes).map(([size, quantity]) => (
                    <p key={size} className="text-sm">
                      Size: {size} - {quantity} pcs
                    </p>
                  ))}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={deliveryDetails.name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={deliveryDetails.email}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="phone1"
              placeholder="Phone 1"
              value={deliveryDetails.phone1}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="phone2"
              placeholder="Phone 2"
              value={deliveryDetails.phone2}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={deliveryDetails.country}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryDetails.city}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={deliveryDetails.state}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={deliveryDetails.address1}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2"
              value={deliveryDetails.address2}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="card">Card Payment</label>
            </div>
            {paymentMethod === "card" && (
              <div className="mt-4">
                <label htmlFor="card-element" className="block mb-2">
                  Card Details
                </label>
                <CardElement
                  id="card-element"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

const CheckoutStripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default CheckoutStripe;
