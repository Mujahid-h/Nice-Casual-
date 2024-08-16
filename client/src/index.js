import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace this with your actual Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51PmDTFC80jaTZneL4fsAurFxdPnnynqTznp6aDtarTsaG8YBhynkRaRQhUCjcGDpJ2nbKvOpJnzYTIVOKSVvXy5n00PAvkfzeT"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
