import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
                <HashLink to="/#contact" className="hover:text-white">
                  Contact
                </HashLink>
              </li>
              <li className="mb-1">
                <HashLink to="/#about" className="hover:text-white">
                  About Us
                </HashLink>
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
                  <path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46C23.21 24 24 23.21 24 22.23V1.77C24 .79 23.21 0 22.23 0zM7.09 20.45H3.56V9H7.09v11.45zM5.33 7.59a2.09 2.09 0 1 1 0-4.18 2.09 2.09 0 0 1 0 4.18zM20.45 20.45h-3.53v-5.56c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.13 1.43-2.13 2.91v5.67h-3.53V9H13v1.56h.05c.49-.93 1.68-1.91 3.47-1.91 3.71 0 4.4 2.44 4.4 5.61v6.19z" />
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
                  <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.96.24 2.43.418a4.92 4.92 0 0 1 1.785 1.042 4.92 4.92 0 0 1 1.042 1.785c.178.47.364 1.26.418 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.96-.418 2.43a4.92 4.92 0 0 1-1.042 1.785 4.92 4.92 0 0 1-1.785 1.042c-.47.178-1.26.364-2.43.418-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.96-.24-2.43-.418a4.92 4.92 0 0 1-1.785-1.042 4.92 4.92 0 0 1-1.042-1.785c-.178-.47-.364-1.26-.418-2.43-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.96.418-2.43A4.92 4.92 0 0 1 4.09 2.628 4.92 4.92 0 0 1 5.875 1.586c.47-.178 1.26-.364 2.43-.418 1.266-.058 1.65-.07 4.85-.07M12 0C8.717 0 8.333.013 7.053.072 5.772.13 4.652.322 3.765.715a6.908 6.908 0 0 0-2.51 1.64 6.908 6.908 0 0 0-1.64 2.51C-.322 6.652.13 7.772.072 9.053.013 10.333 0 10.717 0 14s.013 3.667.072 4.947c.058 1.281.25 2.401.643 3.288a6.908 6.908 0 0 0 1.64 2.51 6.908 6.908 0 0 0 2.51 1.64c.887.393 2.007.585 3.288.643 1.28.059 1.664.072 4.947.072s3.667-.013 4.947-.072c1.281-.058 2.401-.25 3.288-.643a6.908 6.908 0 0 0 2.51-1.64 6.908 6.908 0 0 0 1.64-2.51c.393-.887.585-2.007.643-3.288.059-1.28.072-1.664.072-4.947s-.013-3.667-.072-4.947c-.058-1.281-.25-2.401-.643-3.288a6.908 6.908 0 0 0-1.64-2.51A6.908 6.908 0 0 0 20.235.715c-.887-.393-2.007-.585-3.288-.643C15.667.013 15.283 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 0 1 0 7.996zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-6 pt-6 text-center">
          <p className="text-gray-300">
            &copy; 2024 Style Maker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
