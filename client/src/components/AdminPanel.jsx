import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsers, deleteUser, getUserById, updateUser } from "../api/userApi";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

const AdminPanel = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsers(userInfo.token);
        const productData = await getProducts();
        setUsers(userData);
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching admin data");
        setLoading(false);
      }
    };
    fetchData();
  }, [userInfo.token]);

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id, userInfo.token);
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id, userInfo.token);
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-4">
              <div className="flex justify-between items-center">
                <span>
                  {user.name} ({user.email})
                </span>
                <button
                  onClick={() => deleteUserHandler(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id} className="mb-4">
              <div className="flex justify-between items-center">
                <span>
                  {product.name} (${product.price})
                </span>
                <button
                  onClick={() => deleteProductHandler(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
