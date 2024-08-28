import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";
import shop from "../assets/shop.svg";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
        <div className="bg-[#009dc4] bg-cover rounded-lg min-h-[80vh] flex flex-col lg:flex-row justify-center items-center mb-12 gap-10 p-8 lg:p-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Discover Premium Quality Products
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Elevate your style with our exclusive collection of high-quality,
              premium-class items. We offer products that blend elegance,
              comfort, and durability.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Shop now and experience the perfect fusion of craftsmanship and
              innovation. Whether you're looking for casual wear or something
              special, we have everything you need to make a statement.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-lg font-semibold transition duration-300">
              Start Shopping
            </button>
          </div>
          <img
            src={shop}
            alt="shop image"
            className="lg:w-1/2 w-full h-auto rounded-lg "
          />
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
      </div>
    </DefaultLayout>
  );
};

export default ShopPage;
