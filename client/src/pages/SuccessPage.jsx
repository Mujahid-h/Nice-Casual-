import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>
        Your order has been placed successfully. Thank you for shopping with us!
      </p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default SuccessPage;
