import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SuccessRoute = ({ children }) => {
  const { hasPaid } = useSelector((state) => state.order);

  if (!hasPaid) {
    // If the user has not completed the checkout, redirect to homepage or cart page
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the success page
  return children;
};

export default SuccessRoute;
