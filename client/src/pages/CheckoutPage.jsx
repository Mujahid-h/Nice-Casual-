import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { clearCart } from "../redux/cartSlice";
import { createOrder } from "../api/orderApi";

const stripePromise = loadStripe(
  "pk_test_51PmDTFC80jaTZneL4fsAurFxdPnnynqTznp6aDtarTsaG8YBhynkRaRQhUCjcGDpJ2nbKvOpJnzYTIVOKSVvXy5n00PAvkfzeT"
);

const CheckoutForm = ({
  cartItems,
  totalAmount,
  shippingDetails,
  paymentMethod,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userInfo?.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      try {
        const orderData = {
          items: cartItems,
          totalAmount,
          shippingDetails,
          paymentMethod: "cod",
        };

        console.log("Order Data:", orderData); // Add this line to debug
        const order = await createOrder(orderData, token);

        dispatch(clearCart());
        navigate(`/order/${order._id}`);
      } catch (error) {
        console.error("Order creation failed:", error);
        setError("Failed to create order. Please try again.");
      }
    } else {
      // Handle card payment
      if (!stripe || !elements) {
        setError("Stripe has not loaded yet.");
        setProcessing(false);
        return;
      }

      try {
        const { error: stripeError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
          });

        if (stripeError) {
          setError(stripeError.message);
          setProcessing(false);
          return;
        }

        const order = await createOrder(
          {
            items: cartItems,
            totalAmount,
            shippingDetails,
            paymentMethod: "card",
            paymentMethodId: paymentMethod.id,
          },
          token
        );

        dispatch(clearCart());
        navigate(`/order/${order._id}`);
      } catch (error) {
        console.error("Payment failed:", error);
        setError("Payment failed. Please try again.");
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {paymentMethod === "card" && (
        <div className="mb-4">
          <CardElement />
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 w-full"
      >
        {processing
          ? "Processing..."
          : `Pay ${paymentMethod === "cod" ? "on Delivery" : "Now"}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [shippingDetails, setShippingDetails] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone1: "",
    phone2: "",
    address1: "",
    address2: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=checkout");
    }
  }, [userInfo, navigate]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <form>
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="tel"
              name="phone1"
              value={shippingDetails.phone1}
              onChange={handleInputChange}
              placeholder="Phone 1"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="tel"
              name="phone2"
              value={shippingDetails.phone2}
              onChange={handleInputChange}
              placeholder="Phone 2 (optional)"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              name="address1"
              value={shippingDetails.address1}
              onChange={handleInputChange}
              placeholder="Address 1"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              name="address2"
              value={shippingDetails.address2}
              onChange={handleInputChange}
              placeholder="Address 2 (optional)"
              className="w-full p-2 mb-4 border rounded"
            />
          </form>
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="mb-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="form-radio"
              />
              <span className="ml-2">Card</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="form-radio"
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="mb-4 p-4 bg-gray-100 rounded"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: PKR {item.price * item.quantity}</p>
            </div>
          ))}

          <div className="font-bold text-xl mt-4 mb-4">
            Total: PKR {totalAmount}
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              shippingDetails={shippingDetails}
              paymentMethod={paymentMethod}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
