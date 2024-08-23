import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { getProducts, deleteProduct } from "../api/productApi";
import { getUsers, deleteUser } from "../api/userApi";
import { getOrders } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { MdDelete } from "react-icons/md";

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
        {/* Products Table */}
        <div className="overflow-x-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
            Products
          </h2>
          {loadingProducts ? (
            <Spinner />
          ) : (
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
                        onClick={() =>
                          navigate(`/products/edit/${product._id}`)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-1 hover:bg-yellow-600"
                      >
                        <FaEdit size={24} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 text-white px-3 py-1 mt-1 rounded hover:bg-red-600"
                      >
                        <MdDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Users Table */}
        <div className="overflow-x-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
            Users
          </h2>
          {loadingUsers ? (
            <Spinner />
          ) : (
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
                    <td className="py-2 px-4 border text-center">
                      {user.name}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white  px-3 py-1 rounded hover:bg-red-600"
                      >
                        <MdDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
            Orders
          </h2>
          {loadingOrders ? (
            <Spinner />
          ) : (
            <table className="w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-center font-semibold">
                    Serial No
                  </th>
                  <th className="py-2 px-4 border text-center font-semibold">
                    Order ID
                  </th>
                  <th className="py-2 px-4 border text-center font-semibold">
                    Customer Name
                  </th>
                  <th className="py-2 px-4 border text-center font-semibold">
                    Items
                  </th>
                  <th className="py-2 px-4 border text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {order._id}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {order.user.name}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {order.items.map((item) => (
                        <div key={item.product}>
                          {item.name} ({item.quantity})
                        </div>
                      ))}
                    </td>

                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleViewOrder(order._id)}
                        className="bg-gray-500 text-white  px-3 py-1 rounded hover:bg-gray-600"
                      >
                        <FaEye size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

// import React, { useEffect, useState } from "react";
// import { getProducts, deleteProduct } from "../api/productApi";
// import { getUsers, deleteUser } from "../api/userApi";
// import { getOrders, updateOrderStatus } from "../api/orderApi";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Spinner from "../components/Spinner";

// const AdminPanel = ({ toggleUserView }) => {
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const { userInfo } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const fetchedProducts = await getProducts();
//       setProducts(fetchedProducts);
//     } catch (error) {
//       console.log(error);
//     }
//     setLoadingProducts(false);
//   };

//   const fetchUsers = async () => {
//     setLoadingUsers(true);
//     if (!userInfo || !userInfo.token) {
//       console.error("User is not logged in or token is missing");
//       return;
//     }
//     try {
//       const fetchedUsers = await getUsers(userInfo.token);
//       setUsers(fetchedUsers);
//     } catch (error) {
//       console.log(error);
//     }
//     setLoadingUsers(false);
//   };

//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     try {
//       const fetchedOrders = await getOrders(userInfo.token);
//       setOrders(fetchedOrders);
//     } catch (error) {
//       console.log(error);
//     }
//     setLoadingOrders(false);
//   };

//   const handleUpdateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await updateOrderStatus(orderId, newStatus, userInfo.token);
//       fetchOrders();
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await deleteProduct(productId, userInfo.token);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await deleteUser(userId, userInfo.token);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-gray-800 text-center font-bold my-4 text-3xl">
//         Admin Panel
//       </h1>
//       <div className="mb-4 flex justify-end space-x-4">
//         <button
//           onClick={() => navigate("/products/create")}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
//         >
//           Add Product
//         </button>
//         <button
//           onClick={toggleUserView}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
//         >
//           View as User
//         </button>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="overflow-x-auto">
//           <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
//             Products
//           </h2>
//           {loadingProducts ? (
//             <Spinner />
//           ) : (
//             <table className="w-full bg-white border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Image
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Name
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 flex justify-center border">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-12 h-12 object-cover"
//                       />
//                     </td>
//                     <td className="py-2 text-center px-4 border">
//                       {product.name}
//                     </td>
//                     <td className="py-2 text-center px-4 border">
//                       <button
//                         onClick={() =>
//                           navigate(`/products/edit/${product._id}`)
//                         }
//                         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-1 hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteProduct(product._id)}
//                         className="bg-red-500 text-white px-3 py-1 mt-1 rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div className="overflow-x-auto">
//           <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
//             Users
//           </h2>
//           {loadingUsers ? (
//             <Spinner />
//           ) : (
//             <table className="w-full bg-white border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Name
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Email
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border text-center">
//                       {user.name}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       {user.email}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       <button
//                         onClick={() => handleDeleteUser(user._id)}
//                         className="bg-red-500 text-white  px-3 py-1 rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <h2 className="text-gray-800 font-bold mb-2 text-xl text-center">
//             Orders
//           </h2>
//           {loadingOrders ? (
//             <Spinner />
//           ) : (
//             <table className="w-full bg-white border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Order ID
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Customer
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Status
//                   </th>
//                   <th className="py-2 px-4 border text-center font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border text-center">
//                       {order._id}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       {order.user.name}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       {order.status}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       <select
//                         value={order.status}
//                         onChange={(e) =>
//                           handleUpdateOrderStatus(order._id, e.target.value)
//                         }
//                         className="border rounded px-2 py-1"
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="processing">Processing</option>
//                         <option value="shipped">Shipped</option>
//                         <option value="delivered">Delivered</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
