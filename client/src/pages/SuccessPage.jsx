import React from "react";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.svg";
import { VscDebugContinue } from "react-icons/vsc";
import DefaultLayout from "../components/DefaultLayout";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 flex-col flex justify-center items-center">
        <img src={success} width={150} alt="success_image" className="my-8" />
        <h1 className="text-gray-800 text-center font-bold text-3xl mb-4">
          Payment Successful!
        </h1>
        <p className="text-center mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className="text-center mb-4">
          You can check the status of your delivery in your account.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 flex gap-4 items-center  text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
            <VscDebugContinue size={20} />
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SuccessPage;
