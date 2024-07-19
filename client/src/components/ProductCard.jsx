import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      className="card shadow-md rounded-lg overflow-hidden bg-slate-300 w-64 transition-transform duration-300 hover:scale-102"
      style={{ width: "18rem" }}
    >
      <div className="h-72 overflow-hidden p-1">
        <img
          className="w-full h-full  rounded"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="px-3 py-2">
        <h5 className="text-lg font-bold mb-1 truncate">{product.name}</h5>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-md font-semibold mb-2">${product.price}</p>
        <div className="flex justify-center mb-2">
          <Link
            to={`/product/${product._id}`}
            className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition duration-300 w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
