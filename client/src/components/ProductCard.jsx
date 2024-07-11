// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
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
