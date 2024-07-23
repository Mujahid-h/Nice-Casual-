import React from "react";
import { MdDeleteOutline, MdFolderDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { HiFolderRemove } from "react-icons/hi";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (productId, size) => {
    dispatch(removeFromCart({ _id: productId, size }));
  };

  const handleRemoveProductFromCart = (productId) => {
    cartItems
      .filter((item) => item._id === productId)
      .forEach((item) => {
        dispatch(removeFromCart({ _id: productId, size: item.size }));
      });
  };

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ _id: productId, size, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Group items by product ID
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item._id]) {
      acc[item._id] = { ...item, sizes: {} };
    }
    acc[item._id].sizes[item.size] = item.quantity;
    return acc;
  }, {});

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-gray-800 text-center font-bold my-4 text-3xl">
          Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleClearCart}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300 flex items-center"
              >
                <MdFolderDelete size={20} className="mr-2" /> Clear Cart
              </button>
            </div>
            <div className="space-y-4">
              {Object.values(groupedItems).map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-300 p-4 rounded flex flex-col md:flex-row items-start md:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-contain rounded mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex-grow">
                    <h5 className="font-bold text-xl mb-2">{item.name}</h5>
                    <p className="text-slate-500 mb-2">{item.description}</p>
                    <p className="text-lg font-semibold mb-2">${item.price}</p>
                    <div className="space-y-2 md:space-y-0 md:flex md:flex-wrap">
                      {Object.entries(item.sizes).map(([size, quantity]) => (
                        <div
                          key={size}
                          className="flex items-center space-x-2 mb-2 md:mb-0 md:mr-4"
                        >
                          <span className="text-sm font-medium w-16">
                            Size: {size}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, size, quantity - 1)
                            }
                            className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition duration-300"
                          >
                            -
                          </button>
                          <span className="text-lg w-8 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, size, quantity + 1)
                            }
                            className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition duration-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item._id, size)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                          >
                            <MdDeleteOutline />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveProductFromCart(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mt-4 md:mt-0 md:ml-4 flex gap-2 items-center mx-auto"
                  >
                    <HiFolderRemove size={20} />
                    Delete Product
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-2xl font-bold mb-4">
                Total: ${totalAmount.toFixed(2)}
              </p>
              <Link
                to="/checkout"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 inline-block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
