import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { useSelector } from "react-redux";
import AdminPanel from "../components/AdminPanel";
import HeroSection from "../components/HeroSection";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import Contact from "../components/Contact";
import About from "../components/About";
import ContactImage from "../assets/contact.svg";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [isUserView, setIsUserView] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const toggleUserView = () => {
    setIsUserView(!isUserView);
  };

  return (
    <DefaultLayout>
      {userInfo?.isAdmin && !isUserView ? (
        <AdminPanel toggleUserView={toggleUserView} />
      ) : (
        <>
          <HeroSection />
          <About />
          <div className="container mx-auto p-4">
            <h1 className="text-gray-800 text-center font-bold my-8 text-4xl">
              Featured Products
            </h1>
            <div className="mb-4 flex justify-end">
              {userInfo?.isAdmin && (
                <button
                  onClick={toggleUserView}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  View Admin Panel
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 mb-16 justify-items-center">
              {loading ? (
                <Spinner />
              ) : (
                products.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))
              )}
            </div>

            <div className="p-16 bg-slate-50  rounded-lg ">
              <h1 className="text-2xl mb-12 sm:text-3xl font-extrabold text-gray-900  text-center sm:text-right underline">
                Contact Us
              </h1>
              <div className="flex flex-col items-center justify center gap-8 lg:flex-row">
                <div className="w-[50%] min-w-[50%]">
                  <img src={ContactImage} alt="contact" />
                </div>

                <div className="w-full">
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default HomePage;
