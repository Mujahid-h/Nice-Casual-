import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";

const OrdersPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userInfo && userInfo.token) {
          const fetchedOrders = await getUserOrders(userInfo.token);

          const userOrders = fetchedOrders.filter(
            (order) => order.user === userInfo._id
          );

          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Invoice: {order.invoiceNumber}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
              {/* Add more order details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
