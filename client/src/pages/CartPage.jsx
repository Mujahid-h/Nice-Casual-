import React from "react";
import { MdDeleteOutline, MdFolderDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (productId, size) => {
    dispatch(removeFromCart({ _id: productId, size }));
  };

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ _id: productId, size, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                <MdFolderDelete />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-slate-300 p-4 rounded flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow ml-4">
                      <h5 className="font-bold text-xl">{item.name}</h5>
                      <p className="text-slate-500">{item.description}</p>
                      <p className="text-lg font-semibold mb-2">
                        ${item.price}
                      </p>
                      <p className="text-sm">Size: {item.size}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item._id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition duration-300"
                        >
                          -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item._id, item.size)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/checkout"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
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
