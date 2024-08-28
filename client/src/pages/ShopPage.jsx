import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";
import Shop from "../assets/shop.png";

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
        <div className="bg-center bg-cover bg-no-repeat rounded-lg w-full mb-20">
          <img src={Shop} alt="" className="rounded-lg" />
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
