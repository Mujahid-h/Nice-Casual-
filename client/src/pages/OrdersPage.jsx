// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getUserOrders } from "../api/orderApi";
// import DefaultLayout from "../components/DefaultLayout";
// import { useLocation, useNavigate } from "react-router-dom";

// const OrdersPage = () => {
//   const { userInfo } = useSelector((state) => state.user);
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (userInfo && userInfo.token) {
//           const fetchedOrders = await getUserOrders(userInfo.token);

//           const userOrders = fetchedOrders.filter(
//             (order) => order.user === userInfo._id
//           );

//           setOrders(userOrders);
//         } else {
//           navigate("/login", { state: { from: location.pathname } });
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [userInfo]);

//   return (
//     <DefaultLayout>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
//         {orders.length > 0 ? (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-lg font-semibold">
//                       Invoice: {order.invoiceNumber}
//                     </p>
//                     <p className="text-sm text-gray-500 bg-red-100 p-3 rounded w-fit">
//                       Status: <strong>{order.status}</strong>
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-semibold mb-4">Order Items</h2>
//                   <ul className="space-y-4">
//                     {order.items.map((item, index) => (
//                       <li
//                         key={index}
//                         className="flex justify-between items-center border-b pb-2"
//                       >
//                         <div>
//                           <p className="font-medium">{item.name}</p>
//                           <p className="text-sm text-gray-500">
//                             Size: {item.size}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Quantity: {item.quantity}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-lg font-semibold">
//                             Total: PKR. {order.totalAmount.toFixed(2)}
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="mt-6">
//                   <h2 className="text-xl font-semibold mb-2">
//                     Shipping Details
//                   </h2>
//                   <div className="text-gray-700">
//                     <p>
//                       <strong>Name: </strong>
//                       {order.shippingDetails.name}
//                     </p>
//                     <p>
//                       <strong>Email: </strong>
//                       {order.shippingDetails.email}
//                     </p>
//                     <p>
//                       <strong>Mobile1: </strong> {order.shippingDetails.phone1}
//                       <br />
//                       <strong>Mobile2: </strong>
//                       {order.shippingDetails.phone2
//                         ? `, ${order.shippingDetails.phone2}`
//                         : ""}
//                     </p>
//                     <p>
//                       {" "}
//                       <strong>Address 1: </strong>
//                       {order.shippingDetails.address1}.
//                     </p>
//                     {order.shippingDetails.address2 && (
//                       <p>
//                         <strong>Address 2: </strong>
//                         {order.shippingDetails.address2}.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No orders found.</p>
//         )}
//       </div>
//     </DefaultLayout>
//   );
// };

// export default OrdersPage;

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import DefaultLayout from "../components/DefaultLayout";
import { useLocation, useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userInfo && userInfo.token) {
          const fetchedOrders = await getUserOrders(userInfo.token);
          const userOrders = fetchedOrders.filter(
            (order) => order.user === userInfo._id
          );
          setOrders(userOrders);
        } else {
          navigate("/login", { state: { from: location.pathname } });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userInfo, navigate, location.pathname]);

  // Grouping items by unique product name
  const groupOrderItems = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      if (!groupedItems[item.name]) {
        groupedItems[item.name] = [];
      }
      groupedItems[item.name].push({
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      });
    });
    return groupedItems;
  };

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

                <h2 className="text-xl font-bold mb-2 text-center">Items</h2>
                <div className="border-t border-gray-400 pt-2">
                  {Object.entries(groupOrderItems(order.items)).map(
                    ([productName, sizes], index) => (
                      <div key={index} className="mb-6 ">
                        <h2 className="text-lg font-bold mb-2">
                          {index + 1}) {productName}
                        </h2>
                        <div className="overflow-x-auto">
                          <table className="w-full lg:w-4/6 mx-auto">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-center border-e ">
                                  Size
                                </th>
                                <th className="px-4 py-2 text-center">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {sizes.map((size, idx) => (
                                <tr key={idx} className="border">
                                  <td className="px-4 py-2 text-center border">
                                    {size.size}
                                  </td>
                                  <td className=" py-2 text-center">
                                    {size.quantity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="text-left border-y border-gray-400 py-4">
                  <p className="text-xl font-bold">
                    Total: PKR {order.totalAmount.toFixed(2)}
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-bold mb-2 underline">
                    Shipping Details
                  </h2>
                  <div className="text-gray-700 flex flex-col gap-2">
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
                    </p>
                    {order.shippingDetails.phone2 && (
                      <p>
                        <strong>Mobile2: </strong>
                        {order.shippingDetails.phone2}
                      </p>
                    )}
                    <p>
                      <strong>Address 1: </strong>
                      {order.shippingDetails.address1}
                    </p>
                    {order.shippingDetails.address2 && (
                      <p>
                        <strong>Address 2: </strong>
                        {order.shippingDetails.address2}
                      </p>
                    )}
                    <p>
                      <strong>City: </strong>
                      {order.shippingDetails.city}
                    </p>
                    <p>
                      <strong>State: </strong>
                      {order.shippingDetails.state}
                    </p>
                    <p>
                      <strong>Country: </strong>
                      {order.shippingDetails.country}
                    </p>
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
