import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import { getUsers, deleteUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPanel = () => {
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
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => navigate("/products/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          {products.length > 0 && (
            <>
              <h2 className="text-gray-800 font-bold mb-2">Products</h2>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="mb-2 flex justify-between items-center"
                >
                  <span>{product.name}</span>
                  <div>
                    <button
                      onClick={() =>
                        console.log("Edit product functionality here")
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div>
          {users.length > 0 && (
            <>
              <h2 className="text-gray-800 font-bold mb-2">Users</h2>
              {users.map((user) => (
                <div
                  key={user._id}
                  className="mb-2 flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
