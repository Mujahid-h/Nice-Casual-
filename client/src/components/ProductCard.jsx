import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const initialQuantities = {
    Small: 0,
    Medium: 0,
    Large: 0,
    XLarge: 0,
  };
  const [quantities, setQuantities] = useState(initialQuantities);

  const handleQuantityChange = (size, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [size]: Math.max(prevQuantities[size] + value, 0),
    }));
  };

  const handleAddToCart = () => {
    for (const size in quantities) {
      if (quantities[size] > 0) {
        dispatch(addToCart({ ...product, size, quantity: quantities[size] }));
      }
    }
  };

  return (
    <div
      className="card  shadow-lg rounded-lg overflow-hidden bg-slate-300"
      style={{ width: "18rem" }}
    >
      <div className="h-68 overflow-hidden p-1">
        <img
          className="w-full h-full object-cover object-center"
          src={product.image}
          alt={product.name}
          style={{ borderRadius: "6px" }}
        />
      </div>
      <div className="px-4 py-2">
        <h5 className="text-xl font-bold mb-1">{product.name}</h5>
        {/* <p className="text-sm text-gray-600 mb-1">{product.description}</p>
        <p className="text-md font-semibold mb-2">${product.price}</p> */}

        <div className="mb-3">
          <h6 className="text-sm font-semibold mb-1">Size & Quantity:</h6>
          <div className="space-y-2">
            {[
              ["Small", "Medium"],
              ["Large", "XLarge"],
            ].map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between">
                {row.map((size) => (
                  <div
                    key={size}
                    className="flex items-center bg-gray-100 rounded-md p-1 w-fit px-2"
                  >
                    <span className="text-xs font-medium mr-1">
                      {size.charAt(0)} :
                    </span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(size, -1)}
                        className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs focus:outline-none"
                      >
                        -
                      </button>
                      <span className="mx-2 text-xs w-4 text-center">
                        {quantities[size]}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(size, 1)}
                        className="bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            to={`/product/${product._id}`}
            className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition duration-300"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
