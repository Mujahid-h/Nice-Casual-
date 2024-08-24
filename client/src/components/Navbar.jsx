import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";
import { TiShoppingCart } from "react-icons/ti";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { selectUniqueProductCount } from "../redux/cartSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userLogin = useSelector((state) => state.user.userInfo);
  const uniqueProductCount = useSelector(selectUniqueProductCount);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserInfo(null));
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-400 md:px-12 sm:px-8 py-2 shadow-md active: fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4">
          <img className="h-16 w-auto" src={logo} alt="Logo" />
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-lg font-semibold hover:text-white ">
            Home
          </Link>

          <Link
            to="/orders/myorders"
            className="text-lg font-semibold hover:text-white "
          >
            My Orders
          </Link>
          {userLogin ? (
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={toggleDropdown}
              >
                {userLogin.name}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-white"
            >
              Login
            </Link>
          )}
          <Link
            to="/cart"
            className="relative text-lg font-semibold hover:text-white"
          >
            <TiShoppingCart className="text-3xl" />
            {uniqueProductCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {uniqueProductCount}
              </div>
            )}
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div
            className={`fixed inset-y-0 right-0 w-64 bg-white p-4 shadow-md transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none mb-4"
            >
              <HiOutlineX />
            </button>
            <Link
              to="/"
              className="block px-4 py-2 text-lg font-semibold"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {userLogin ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-lg font-semibold"
                >
                  {userLogin.name}
                </button>
                {dropdownOpen && (
                  <div className="flex flex-col space-y-2 bg-white p-2 rounded-md shadow-md">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-lg font-semibold hover:text-white"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
            <Link
              to="/cart"
              className="relative block px-4 py-2 text-lg font-semibold hover:text-white"
              onClick={toggleMenu}
            >
              <TiShoppingCart className="text-3xl" />
              {uniqueProductCount > 0 && (
                <div className="absolute -top-2 -right-2  bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                  {uniqueProductCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
