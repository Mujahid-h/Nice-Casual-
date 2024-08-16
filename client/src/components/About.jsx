import React from "react";
import aboutImage from "../assets/about.svg";

const About = () => {
  return (
    <section className="w-[90%] mx-auto min-h-[70vh] lg:h-[100vh] md:h-[50vh]  rounded-xl mt-20 flex items-center justify-center gap-4 px-4 flex-col-reverse lg:flex-row bg-slate-50">
      <div>
        <img src={aboutImage} alt="about" />
      </div>
      <div className="w-[60%]">
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
