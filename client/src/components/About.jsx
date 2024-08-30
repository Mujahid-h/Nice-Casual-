import React from "react";
import aboutImage from "../assets/shop.svg";

const About = () => {
  return (
    <section
      id="about"
      className="w-[90%] mx-auto py-12 min-h-[70vh] lg:h-[100vh] md:h-[50vh] rounded-xl mt-20 flex flex-col-reverse lg:flex-row items-center justify-center gap-4 px-4 bg-slate-50"
    >
      <div className="w-full lg:w-[40%] flex justify-center">
        <img
          src={aboutImage}
          alt="about"
          className="w-full max-w-xs sm:max-w-sm lg:max-w-none animate-wiggle transform duration-100"
        />
      </div>
      <div className="w-full lg:w-[60%]">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 text-center sm:text-right underline">
          About Us
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center sm:text-right">
          Welcome to our store! We are dedicated to providing the best products
          and services to our customers. Our team is passionate about what we do
          and we strive to make your shopping experience seamless and enjoyable.
          Thank you for choosing us!
        </p>
      </div>
    </section>
  );
};

export default About;
