import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      className="card shadow-md rounded-lg overflow-hidden flex justify-center bg-slate-300 w-fit sm:max-w-96 transition-transform duration-300 hover:scale-102"
      // style={{ width: "18rem" }}
    >
      <div className="md:h-5/6 lg:h-4/6 overflow-hidden p-1">
        <img
          className="w-full h-full  rounded"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="px-3 py-2">
        <h5 className="text-xl font-bold mb-1 truncate">{product.name}</h5>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-md font-bold mb-2 text-gray-700">
          PKR. {product.price}
        </p>
        <div className="flex justify-center mb-2">
          <Link
            to={`/product/${product._id}`}
            className="bg-blue-500 text-white px-3 py-2  rounded text-md my-2 hover:bg-blue-600 transition duration-300 w-full  text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
