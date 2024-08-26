import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import { getUsers, deleteUser } from "../api/userApi";
import { getOrders } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersTable from "./admin/UsersTable";
import ProductsTable from "./admin/ProductsTable";
import OrdersTable from "./admin/OrdersTable";

const AdminPanel = ({ toggleUserView }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
    setLoadingProducts(false);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    if (!userInfo || !userInfo.token) {
      console.error("User is not logged in or token is missing");
      return;
    }
    try {
      const fetchedUsers = await getUsers(userInfo.token);
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
    setLoadingUsers(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const fetchedOrders = await getOrders(userInfo.token);
      setOrders(fetchedOrders);
    } catch (error) {
      console.log(error);
    }
    setLoadingOrders(false);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/manage/${orderId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, userInfo.token);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, userInfo.token);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-gray-800 text-center font-bold my-4 text-3xl">
        Admin Panel
      </h1>

      <div className="mb-4 flex justify-end space-x-4 ">
        <button
          onClick={() => navigate("/products/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
        <button
          onClick={toggleUserView}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          View as User
        </button>
      </div>

      <div className="bg-blue-300 my-10 py-10 rounded-lg">
        <UsersTable
          users={users}
          loadingUsers={loadingUsers}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
      <div className="bg-[#a2eeea] my-10 py-10 rounded-lg">
        <ProductsTable
          products={products}
          loadingProducts={loadingProducts}
          handleDeleteProduct={handleDeleteProduct}
          navigate={navigate}
        />
      </div>
      <div className="bg-indigo-300 my-10 py-10 rounded-lg">
        <OrdersTable
          orders={orders}
          loadingOrders={loadingOrders}
          handleViewOrder={handleViewOrder}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
