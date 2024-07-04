import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8  ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6 sm:mb-0">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p className="text-gray-300">
              We are a leading eCommerce platform providing top quality products
              and exceptional customer service.
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6 sm:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="text-gray-300">
              <li className="mb-1">
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6 sm:mb-0">
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 text-gray-300">
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h10.94v-9.29H9.91V10.5h2.81V8.36c0-2.78 1.67-4.29 4.14-4.29 1.2 0 2.23.09 2.53.13v2.93h-1.74c-1.36 0-1.63.65-1.63 1.6v2.1h3.27l-.43 3.21h-2.84V24h5.57c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569c-.885.391-1.83.656-2.825.775a4.932 4.932 0 0 0 2.165-2.724 9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482 13.948 13.948 0 0 1-10.125-5.139 4.822 4.822 0 0 0-.664 2.475 4.92 4.92 0 0 0 2.188 4.097 4.903 4.903 0 0 1-2.229-.616v.061a4.917 4.917 0 0 0 3.946 4.827 4.935 4.935 0 0 1-2.224.084 4.93 4.93 0 0 0 4.604 3.416A9.867 9.867 0 0 1 0 19.539a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.016-.634a10.005 10.005 0 0 0 2.412-2.548l.002-.002z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.304 3.438 9.787 8.205 11.387.6.111.82-.261.82-.581 0-.286-.011-1.044-.017-2.049-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.088-.744.082-.729.082-.729 1.204.084 1.837 1.237 1.837 1.237 1.07 1.832 2.807 1.303 3.492.996.107-.774.418-1.304.762-1.604-2.665-.303-5.466-1.333-5.466-5.933 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.521.116-3.169 0 0 1.008-.322 3.301 1.229a11.504 11.504 0 0 1 3.004-.404c1.018.005 2.045.137 3.004.404 2.293-1.551 3.298-1.229 3.298-1.229.654 1.648.242 2.866.119 3.169.77.84 1.236 1.91 1.236 3.22 0 4.611-2.803 5.626-5.475 5.922.43.372.814 1.102.814 2.222 0 1.604-.015 2.896-.015 3.287 0 .323.218.697.824.579C20.564 21.787 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.004 5.998c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5m0-2C8.141 3.998 5 7.14 5 11s3.141 7.002 7.004 7.002 7.002-3.141 7.002-7.002-3.141-7.002-7.002-7.002zm6.001-.004c.553 0 1.001-.448 1.001-1.001s-.448-1.001-1.001-1.001-1.001.448-1.001 1.001.448 1.001 1.001 1.001zM12 7.256c-2.606 0-4.74 2.134-4.74 4.74s2.134 4.74 4.74 4.74 4.74-2.134 4.74-4.74-2.134-4.74-4.74-4.74zm6.336-.006c.553 0 1.001-.448 1.001-1.001s-.448-1.001-1.001-1.001-1.001.448-1.001 1.001.448 1.001 1.001 1.001zm-6.337 2.683c1.135 0 2.055.92 2.055 2.056 0 1.135-.92 2.055-2.055 2.055-1.135 0-2.056-.92-2.056-2.055 0-1.135.921-2.056 2.056-2.056z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-300">
            &copy; 2024 Nice Casual. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
