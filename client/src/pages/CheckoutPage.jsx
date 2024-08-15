import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "../api/orderApi";
import { clearCart } from "../redux/cartSlice";
import DefaultLayout from "../components/DefaultLayout";

// Load Stripe outside of the component to avoid recreating the Stripe object
const stripePromise = loadStripe(
  "pk_test_51PmDTFC80jaTZneL4fsAurFxdPnnynqTznp6aDtarTsaG8YBhynkRaRQhUCjcGDpJ2nbKvOpJnzYTIVOKSVvXy5n00PAvkfzeT"
);

const CheckoutForm = ({ totalAmount, shippingDetails, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (paymentMethod === "card") {
      if (!stripe || !elements) {
        setProcessing(false);
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      // Create order with Stripe payment
      try {
        const order = await createOrder(
          {
            items,
            shippingDetails,
            paymentMethod: "card",
            totalAmount,
            paymentMethodId: stripePaymentMethod.id,
          },
          user.token
        );

        dispatch(clearCart());
        navigate("/order-confirmation", { state: { order } });
      } catch (err) {
        setError(
          "An error occurred while processing your payment. Please try again."
        );
      }
    } else {
      // Create order with COD
      try {
        const order = await createOrder(
          {
            items,
            shippingDetails,
            paymentMethod: "cod",
            totalAmount,
          },
          user.token
        );

        dispatch(clearCart());
        navigate("/order-confirmation", { state: { order } });
      } catch (err) {
        setError(
          "An error occurred while placing your order. Please try again."
        );
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Pay with Card
        </label>
        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>

      {paymentMethod === "card" && (
        <div>
          <CardElement />
        </div>
      )}

      {error && <div>{error}</div>}

      <button type="submit" disabled={processing}>
        {processing ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    address1: "",
    address2: "",
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.18;
  const deliveryCharge = 250;
  const grandTotal = totalAmount + tax + deliveryCharge;

  const handleShippingDetailsChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
            <form>
              {/* Add input fields for shipping details */}
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleShippingDetailsChange}
                placeholder="Full Name"
                required
              />
              {/* Add more input fields for email, phone, address, etc. */}
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={`${item._id}-${item.size}`} className="mb-2">
                <span>
                  {item.name} (Size: {item.size})
                </span>
                <span className="float-right">
                  {item.quantity} x PKR {item.price} = PKR{" "}
                  {item.quantity * item.price}
                </span>
              </div>
            ))}
            <div className="mt-4">
              <p>Subtotal: PKR {totalAmount.toFixed(2)}</p>
              <p>Tax (18%): PKR {tax.toFixed(2)}</p>
              <p>Delivery Charges: PKR {deliveryCharge.toFixed(2)}</p>
              <p className="font-bold">
                Grand Total: PKR {grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              totalAmount={grandTotal}
              shippingDetails={shippingDetails}
              items={cartItems}
            />
          </Elements>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
