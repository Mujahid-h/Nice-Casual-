import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import DefaultLayout from "../components/DefaultLayout";

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
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg font-semibold">
                      Invoice: {order.invoiceNumber}
                    </p>
                    <p className="text-sm text-gray-500 bg-red-100 p-3 rounded w-fit">
                      Status: <strong>{order.status}</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <ul className="space-y-4">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">
                            Total: PKR. {order.totalAmount.toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Shipping Details
                  </h2>
                  <div className="text-gray-700">
                    <p>
                      <strong>Name: </strong>
                      {order.shippingDetails.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {order.shippingDetails.email}
                    </p>
                    <p>
                      <strong>Mobile1: </strong> {order.shippingDetails.phone1}
                      <br />
                      <strong>Mobile2: </strong>
                      {order.shippingDetails.phone2
                        ? `, ${order.shippingDetails.phone2}`
                        : ""}
                    </p>
                    <p>
                      {" "}
                      <strong>Address 1: </strong>
                      {order.shippingDetails.address1},
                      {order.shippingDetails.city},{" "}
                      {order.shippingDetails.state},{" "}
                      {order.shippingDetails.country}
                    </p>
                    {order.shippingDetails.address2 && (
                      <p>
                        <strong>Address 2: </strong>
                        {order.shippingDetails.address2},{" "}
                        {order.shippingDetails.city},{" "}
                        {order.shippingDetails.state},{" "}
                        {order.shippingDetails.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
