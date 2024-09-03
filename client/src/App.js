import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProducts";
import EditProduct from "./pages/EditProduct";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import OrderManagementPage from "./pages/OrderManagementPage";
import OrdersPage from "./pages/OrdersPage";
import PageNotFound from "./pages/PageNotFound";
import ShopPage from "./pages/ShopPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SuccessRoute from "./routes/SuccessRoute";

const App = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Protected Routes */}
          <Route
            path="/products/create"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/orders/manage/:id" element={<OrderManagementPage />} />

          {/* Protect Success Page */}
          <Route
            path="/success"
            element={
              <SuccessRoute>
                <SuccessPage />
              </SuccessRoute>
            }
          />

          <Route path="/orders/myorders" element={<OrdersPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
