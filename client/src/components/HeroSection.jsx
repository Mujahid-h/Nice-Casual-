import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

const HeroSection = () => {
  return (
    <div className="relative w-[90%] mx-auto mb-20">
      <img src={hero} alt="Hero Image" className="w-full h-auto rounded-lg" />
    </div>
  );
};

export default HeroSection;
