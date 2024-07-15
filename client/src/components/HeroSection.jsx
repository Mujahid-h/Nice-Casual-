import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-no-repeat bg-cover h-[80vh] w-[80%] rounded-xl mx-auto mt-24"
      style={{ backgroundImage: "url('./hero.png')" }}
    >
      <div className="absolute inset-0 bg-white opacity-20"></div>
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Welcome to Our Store
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Discover the best products at unbeatable prices.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 px-6 py-3 rounded text-lg hover:bg-blue-700 transition duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
