import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById } from "../api/productApi";
import { addToCart } from "../redux/cartSlice";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialQuantities = {
    Small: 0,
    Medium: 0,
    Large: 0,
    XLarge: 0,
  };
  const [quantities, setQuantities] = useState(initialQuantities);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (size, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [size]: Math.max(prevQuantities[size] + value, 0),
    }));
  };

  // const handleAddToCart = () => {
  //   const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);
  //   if (totalQuantity === 0) {
  //     setAlert("Please select a size before adding to cart.");
  //     setTimeout(() => setAlert(""), 3000);
  //     return;
  //   }

  //   for (const size in quantities) {
  //     if (quantities[size] > 0) {
  //       dispatch(addToCart({ ...product, size, quantity: quantities[size] }));
  //     }
  //   }
  //   setAlert("Added to cart successfully!");
  //   setTimeout(() => setAlert(""), 3000);
  // };

  const handleAddToCart = () => {
    const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);
    if (totalQuantity === 0) {
      setAlert("Please select a size before adding to cart.");
      setTimeout(() => setAlert(""), 3000);
      return;
    }

    // Dispatch actions for each size
    for (const size in quantities) {
      if (quantities[size] > 0) {
        dispatch(
          addToCart({
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            size,
            quantity: quantities[size],
          })
        );
      }
    }
    setAlert("Added to cart successfully!");
    setTimeout(() => setAlert(""), 3000);
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </DefaultLayout>
    );
  }

  if (!product) {
    return (
      <DefaultLayout>
        <h1 className="text-center mt-8">Product not found</h1>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-4 lg:mb-0 mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="lg:w-[80%] md:w-full sm:w-full rounded shadow-xl mx-auto hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="lg:w-1/2 lg:pl-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-700 mb-4">PKR. {product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <h6 className="text-sm font-semibold mb-2">Size & Quantity:</h6>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(initialQuantities).map((size) => (
                  <div
                    key={size}
                    className="flex items-center justify-between bg-gray-100 rounded-md p-2"
                  >
                    <span className="text-sm font-medium">{size}</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(size, -1)}
                        className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm focus:outline-none"
                      >
                        -
                      </button>
                      <span className="mx-2 text-sm w-6 text-center">
                        {quantities[size]}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(size, 1)}
                        className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {alert && (
              <div
                className={`mb-4 p-2 rounded ${
                  alert.includes("successfully")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {alert}
              </div>
            )}
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetailPage;
