import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover min-h-[50vh] lg:h-[100vh] sm:h-[50vh] md:h-[50vh] w-[90%] rounded-xl mx-auto mt-12 flex items-end"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="relative mx-auto flex flex-col items-center justify-end pb-20 min-h-full text-gray-300 z-20">
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
