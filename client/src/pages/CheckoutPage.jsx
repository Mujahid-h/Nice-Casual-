// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createOrder as apiCreateOrder } from "../api/orderApi";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../redux/cartSlice";
// import DefaultLayout from "../components/DefaultLayout";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     email: "",
//     phone1: "",
//     phone2: "",
//     country: "",
//     city: "",
//     state: "",
//     address1: "",
//     address2: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const { userInfo } = useSelector((state) => state.user);
//   const { cartItems } = useSelector((state) => state.cart);

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login", { state: { from: location.pathname } });
//     }
//   }, [userInfo, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const calculateTotalAmount = () => {
//     const subtotal = cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     const tax = subtotal * 0.18;
//     const deliveryCharge = 250;
//     const totalAmount = subtotal + tax + deliveryCharge;

//     return totalAmount;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Calculate total amount
//       const totalAmount = calculateTotalAmount();

//       // Prepare order data
//       const orderData = {
//         items: cartItems,
//         shippingDetails,
//         paymentMethod: "cash",
//         totalAmount,
//         status: "Pending",
//       };

//       // Call the API to create the order
//       await apiCreateOrder(orderData, userInfo.token);

//       // Clear the cart in localStorage
//       dispatch(clearCart());

//       // Navigate to success page
//       navigate("/success");
//     } catch (error) {
//       setError(
//         "An error occurred while processing your order. Please try again."
//       );
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DefaultLayout>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//         {error && alert(error)}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="bg-white p-4 rounded shadow-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
//             {cartItems.map((item) => (
//               <div key={item.id} className="border-b border-gray-200 pb-2 mb-2">
//                 <div className="font-medium">{item.name}</div>
//                 <div>Size: {item.size}</div>
//                 <div>Price: PKR. {item.price.toFixed(2)}</div>
//                 <div>Quantity: {item.quantity}</div>
//               </div>
//             ))}
//           </div>
//           <div className="bg-white p-4 rounded shadow-md mb-4">
//             <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
//             <div className="space-y-2">
//               {Object.keys(shippingDetails).map((key) => (
//                 <div key={key} className="flex flex-col">
//                   <label htmlFor={key} className="font-medium">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </label>
//                   <input
//                     id={key}
//                     name={key}
//                     type="text"
//                     value={shippingDetails[key]}
//                     onChange={handleInputChange}
//                     className="p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`bg-blue-500 text-white py-2 px-4 rounded ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Processing..." : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder as apiCreateOrder } from "../api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import DefaultLayout from "../components/DefaultLayout";
import { paymentSuccess } from "../redux/orderSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    country: "",
    city: "",
    state: "",
    address1: "",
    address2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [userInfo, navigate, location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const groupCartItemsByProduct = () => {
    const groupedItems = {};

    cartItems.forEach((item) => {
      if (!groupedItems[item._id]) {
        groupedItems[item._id] = {
          ...item,
          sizes: [{ size: item.size, quantity: item.quantity }],
        };
      } else {
        groupedItems[item._id].sizes.push({
          size: item.size,
          quantity: item.quantity,
        });
      }
    });

    return Object.values(groupedItems);
  };

  const prepareOrderItems = () => {
    return cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }));
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.18;
    const deliveryCharge = 250;
    const totalAmount = subtotal + tax + deliveryCharge;

    return totalAmount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalAmount = calculateTotalAmount();
      const orderItems = prepareOrderItems();

      const orderData = {
        items: orderItems,
        shippingDetails,
        paymentMethod: "cash",
        totalAmount,
        status: "Pending",
      };

      await apiCreateOrder(orderData, userInfo.token);
      dispatch(clearCart());
      dispatch(paymentSuccess());
      navigate("/success");
    } catch (error) {
      setError(
        "An error occurred while processing your order. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const groupedCartItems = groupCartItemsByProduct();

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {groupedCartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="overflow-x-auto border-b border-gray-400 pb-10">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-left">Product</th>
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Quantity</th>
                      <th className="border px-4 py-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">
                          {item.sizes.map((sizeInfo, index) => (
                            <div key={index}>{sizeInfo.size}</div>
                          ))}
                        </td>
                        <td className="border px-4 py-2">
                          {item.sizes.map((sizeInfo, index) => (
                            <div key={index}>{sizeInfo.quantity}</div>
                          ))}
                        </td>
                        <td className="border px-4 py-2">
                          {item.sizes.map((sizeInfo, index) => (
                            <div key={index}>
                              {sizeInfo.quantity * item.price}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="font-semibold text-lg mt-4">
              Total Amount: PKR {calculateTotalAmount().toFixed(2)}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(shippingDetails).map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type="text"
                    value={shippingDetails[key]}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                    placeholder={`Enter ${key}`}
                    required={key !== "phone2" && key !== "address2"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 px-4 rounded w-fit mx-auto ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
