// src/pages/CartPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
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
              Clear Cart
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="card bg-slate-300 p-4 rounded">
                <div className="flex justify-between items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-grow ml-4">
                    <h5 className="font-bold text-xl">{item.name}</h5>
                    <p className="text-slate-500">{item.description}</p>
                    <p className="text-lg font-semibold mb-2">${item.price}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
