// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-slate-300" style={{ width: "18rem" }}>
      <img
        className="card-img-top p-1"
        src={product.image}
        alt={product.name}
        style={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <div className="card-body">
        <h5 className="card-title text-xl font-bold">{product.name}</h5>
        <p className="card-text text-slate-500">{product.description}</p>
        <p className="card-text text-lg font-semibold mb-2">${product.price}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/product/${product._id}`} className="btn btn-primary">
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-success"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const addToCart = (product) => {
  // Function to handle adding product to cart
  console.log(`${product.name} added to cart`);
};

export default ProductCard;
