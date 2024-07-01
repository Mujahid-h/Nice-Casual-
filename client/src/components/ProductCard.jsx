import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
        />
      </Link>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-800">${product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
