import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartItems.map((item) => (
            <div key={item.product} className="border p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="ml-4">
                  <Link to={`/product/${item.product}`}>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                  </Link>
                  <p className="text-gray-800">${item.price}</p>
                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
