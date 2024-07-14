import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import { getUsers, deleteUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPanel = ({ toggleUserView }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
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
      <div className="mb-4 flex justify-end space-x-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="overflow-x-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
            Products
          </h2>
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center font-semibold">
                  Image
                </th>
                <th className="py-2 px-4 border text-center font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 flex justify-center border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="py-2 text-center px-4 border">
                    {product.name}
                  </td>
                  <td className="py-2 text-center px-4 border">
                    <button
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-1 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 mt-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
            Users
          </h2>
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border text-center font-semibold">
                  Email
                </th>
                <th className="py-2 px-4 border text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{user.name}</td>
                  <td className="py-2 px-4 border text-center">{user.email}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white  px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
