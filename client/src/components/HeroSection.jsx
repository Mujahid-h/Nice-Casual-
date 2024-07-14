import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="anime w-[90%] mx-auto h-[80vh] mt-12 rounded-xl">
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Welcome to Nice Casual
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Shop with the latest trends
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-transparent px-6 py-3 rounded text-lg border"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
