import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    // If the user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userInfo.role !== requiredRole) {
    // If the user does not have the required role (e.g., admin), redirect to homepage
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
