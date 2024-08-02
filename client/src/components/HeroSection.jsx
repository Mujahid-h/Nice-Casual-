import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-no-repeat bg-cover h-[80vh] w-[80%] rounded-xl mx-auto mt-40"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="absolute inset-0 bg-white opacity-20 z-10"></div>
      <div className="container mx-auto flex flex-col items-center justify-end pb-10 h-full text-black z-20 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Welcome to Our Store
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center font-semibold">
          Discover the best products at unbeatable prices.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 px-6 py-2 rounded text-lg hover:bg-blue-700 transition text-white duration-300 cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
