import React from "react";
import aboutImage from "../assets/about.jpg";

const About = () => {
  return (
    <section
      className="w-[90%] mx-auto lg:h-[90vh] md:h-[50vh] sm:h-[50vh] rounded-xl mt-20 bg-no-repeat bg-cover bg-center flex items-center justify-center sm:justify-end"
      style={{ backgroundImage: `url(${aboutImage})` }}
    >
      <div className="bg-white bg-opacity-50 p-6 sm:p-8 lg:p-12 w-full sm:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col justify-center sm:mr-10 lg:mr-20 rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 text-center sm:text-right">
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
