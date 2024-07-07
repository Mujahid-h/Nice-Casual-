import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

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

  return (
    <div className="container mx-auto p-4">
      {userInfo?.isAdmin !== true ? (
        <>
          <h1 className="text-gray-800 text-center font-bold my-4 text-3xl">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center my-4">
          <h1 className="text-gray-800 text-3xl font-bold">Admin Panel</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
