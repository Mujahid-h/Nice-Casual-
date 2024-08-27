import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import NotFound from "../assets/PageNotFound.svg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <main className="flex flex-col justify-center items-center gap-20 my-20 ">
        <img src={NotFound} alt="Page Not Found" width={400} />
        <button
          className="bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </main>
    </DefaultLayout>
  );
};

export default PageNotFound;
