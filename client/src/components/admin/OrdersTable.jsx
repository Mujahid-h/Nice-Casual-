import React from "react";
import { FaEye } from "react-icons/fa";
import Spinner from "../Spinner";

const OrdersTable = ({ orders, loadingOrders, handleViewOrder }) => {
  return (
    <div className="overflow-x-auto w-full lg:w-5/6 mx-auto">
      <h2 className="text-gray-800 font-bold mb-4 text-xl text-center">
        Orders
      </h2>
      {loadingOrders ? (
        <Spinner />
      ) : (
        <table className="w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
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
              <tr key={order._id} className="hover:bg-purple-100">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">{order._id}</td>
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
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
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
  );
};

export default OrdersTable;
