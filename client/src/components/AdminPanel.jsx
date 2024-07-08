import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import { getUsers, deleteUser } from "../api/userApi";
import AddProduct from "./AddProducts";
import EditProduct from "./EditProduct";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
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
      <div className="mb-4">
        <AddProduct onProductAdded={fetchProducts} />
      </div>
      {editingProduct && (
        <div className="mb-4">
          <EditProduct
            product={editingProduct}
            onProductUpdated={() => {
              fetchProducts();
              setEditingProduct(null);
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          <h2 className="text-gray-800 font-bold mb-2">Products</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className="mb-2 flex justify-between items-center"
            >
              <span>{product.name}</span>
              <div>
                <button
                  onClick={() => setEditingProduct(product)}
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
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
