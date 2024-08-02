import React from "react";
import aboutImage from "../assets/about.jpg";

const About = () => {
  return (
    <section
      className="py-16 m-16"
      style={{ backgroundImage: `url(${aboutImage})` }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
