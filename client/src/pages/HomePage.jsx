import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { useSelector } from "react-redux";
import AdminPanel from "../components/AdminPanel";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [isUserView, setIsUserView] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const toggleUserView = () => {
    setIsUserView(!isUserView);
  };

  return (
    <div>
      {userInfo?.isAdmin && !isUserView ? (
        <AdminPanel toggleUserView={toggleUserView} />
      ) : (
        <>
          <HeroSection />
          <div className="container mx-auto p-4">
            <h1 className="text-gray-800 text-center font-bold my-4 text-3xl">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
