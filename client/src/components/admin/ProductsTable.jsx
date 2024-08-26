import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Spinner from "../Spinner";

const ProductsTable = ({
  products,
  loadingProducts,
  handleDeleteProduct,
  navigate,
}) => {
  return (
    <div className="overflow-x-auto w-full lg:w-5/6 mx-auto">
      <h2 className="text-gray-800 font-bold mb-4 text-xl text-center">
        Products
      </h2>
      {loadingProducts ? (
        <Spinner />
      ) : (
        <table className="w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="py-2 px-4 border text-center font-semibold">
                Image
              </th>
              <th className="py-2 px-4 border text-center font-semibold">
                Name
              </th>
              <th className="py-2 px-4 border text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-teal-100">
                <td className="py-2 px-4 flex justify-center border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="py-2 text-center px-4 border">{product.name}</td>
                <td className="py-2 text-center px-4 border">
                  <button
                    onClick={() => navigate(`/products/edit/${product._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-1 hover:bg-yellow-600"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 mt-1 rounded hover:bg-red-600"
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsTable;
