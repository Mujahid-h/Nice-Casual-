// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getOrderById, updateOrderStatus } from "../api/orderApi";
// import { useSelector } from "react-redux";

// const OrderManagementPage = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.user);

//   const token = userInfo.token;
//   const orderId = id;

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const data = await getOrderById(orderId, token);
//         setOrder(data);
//         setStatus(data.status);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch order details");
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId, token]);

//   const handleStatusUpdate = async () => {
//     try {
//       await updateOrderStatus(orderId, status, token);
//       alert("Order status updated successfully");
//     } catch (err) {
//       alert(
//         `Failed to update order status: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 my-12 bg-white shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Order Management</h2>

//       <div className="mb-6">
//         <h3 className="text-lg font-bold">Order Details</h3>
//         <div className="mt-2">
//           <p className="text-gray-600">
//             <strong>Customer:</strong> {order.user.name}
//           </p>
//           <p className="text-gray-600">
//             <strong>Email:</strong> {order.user.email}
//           </p>
//           <p className="text-gray-600">
//             <strong>Order Date:</strong>{" "}
//             {new Date(order.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-bold">Items</h3>
//         <div className="mt-2">
//           {order.items.map((item) => (
//             <div key={item.product} className="border-b py-2">
//               <p className="text-gray-600">
//                 <strong>Product:</strong> {item.name}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Quantity:</strong> {item.quantity}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Size:</strong> {item.size || "N/A"}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-bold">Shipping Details</h3>
//         <div className="mt-2">
//           <p className="text-gray-600">
//             <strong>Address:</strong> {order.shippingDetails.address1},{" "}
//             {order.shippingDetails.city}, {order.shippingDetails.state},{" "}
//             {order.shippingDetails.country}
//           </p>
//           <p className="text-gray-600">
//             <strong>Phone 1:</strong> {order.shippingDetails.phone1}
//           </p>
//           <p className="text-gray-600">
//             <strong>Phone 2:</strong> {order.shippingDetails.phone2}
//           </p>
//           <p className="text-gray-600">
//             <strong>Total Amount: PKR.{order.totalAmount}</strong>
//           </p>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-bold">Order Status</h3>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border rounded p-2 mt-2"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Processing">Processing</option>
//           <option value="Departed">Departed</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={handleStatusUpdate}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Update Status
//         </button>

//         <button
//           onClick={() => navigate("/")}
//           className="bg-gray-100 hover:bg-gray-200 border text-black-100 font-bold px-4 py-2 rounded"
//         >
//           Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderManagementPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../api/orderApi";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";

const OrderManagementPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const token = userInfo.token;
  const orderId = id;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(orderId, token);
        setOrder(data);
        setStatus(data.status);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  const handleStatusUpdate = async () => {
    try {
      await updateOrderStatus(orderId, status, token);
      alert("Order status updated successfully");
    } catch (err) {
      alert(
        `Failed to update order status: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const generateInvoice = () => {
    const doc = new jsPDF();

    // Define styling options
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add Invoice title with larger font and bold style
    doc.setFontSize(22);
    doc.setFont("Helvetica", "bold");
    doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

    // Add a horizontal line below the title
    doc.setLineWidth(0.5);
    doc.line(10, 25, pageWidth - 10, 25);

    // Customer Info Section
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Invoice Number: ${order.invoiceNumber}`, 10, 35);
    doc.text(`Customer: ${order.user.name}`, 10, 45);
    doc.text(`Email: ${order.user.email}`, 10, 55);
    doc.text(`Phone: ${order.user.phone1}`, 10, 55);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleString()}`,
      10,
      65
    );

    // Add a section divider
    doc.setLineWidth(0.5);
    doc.line(10, 75, pageWidth - 10, 75);

    // Items Section
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Items", 10, 85);

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    order.items.forEach((item, index) => {
      const itemYPosition = 95 + index * 10;
      doc.text(`${index + 1}. ${item.name}`, 10, itemYPosition);
      doc.text(`Qty: ${item.quantity}`, pageWidth / 2, itemYPosition);
    });

    // Add another section divider
    doc.setLineWidth(0.5);
    doc.line(
      10,
      105 + order.items.length * 10,
      pageWidth - 10,
      105 + order.items.length * 10
    );

    // Total Amount Section
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Total Amount:", 10, 115 + order.items.length * 10);
    doc.setFontSize(12);
    doc.text(
      `PKR.${order.totalAmount}`,
      pageWidth / 2,
      115 + order.items.length * 10
    );

    // Add a footer with a thank you note
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Thank you for your purchase!", pageWidth / 2, pageHeight - 20, {
      align: "center",
    });

    // Save the generated PDF
    doc.save(`Invoice_${order.invoiceNumber}.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Group items by product name
  const groupedItems = order.items.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-4 my-12 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold">Order Details</h3>
        <div className="mt-2">
          <p className="text-gray-600">
            <strong>Customer:</strong> {order.user.name}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {order.user.email}
          </p>
          <p className="text-gray-600">
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong>Invoice Number:</strong> {order.invoiceNumber}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Items</h3>
        {Object.keys(groupedItems).map((productName, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="text-md font-semibold">{productName}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Size</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems[productName].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{item.size}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        PKR {(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold">Shipping Details</h3>
        <div className="mt-2">
          <p className="text-gray-600">
            <strong>Address:</strong> {order.shippingDetails.address1}
          </p>
          <p className="text-gray-600">
            <strong>City:</strong> {order.shippingDetails.city}
          </p>
          <p className="text-gray-600">
            <strong>State:</strong> {order.shippingDetails.state}
          </p>
          <p className="text-gray-600">
            <strong>Country:</strong> {order.shippingDetails.country}
          </p>
          <p className="text-gray-600">
            <strong>Phone 1:</strong> {order.shippingDetails.phone1}
          </p>
          {order.shippingDetails.phone2 && (
            <p className="text-gray-600">
              <strong>Phone 2:</strong> {order.shippingDetails.phone2}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold">Order Summary</h3>
        <p className="text-gray-600">
          <strong>Total Amount:</strong> PKR {order.totalAmount.toFixed(2)}
        </p>
        <p className="text-gray-600">
          <strong>Current Status:</strong> {order.status}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold">Update Order Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 mt-2"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Departed">Departed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            onClick={handleStatusUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Status
          </button>

          <button
            onClick={generateInvoice}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Generate Invoice
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-100 hover:bg-gray-200 border text-black-100 font-bold px-4 py-2 rounded"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default OrderManagementPage;
