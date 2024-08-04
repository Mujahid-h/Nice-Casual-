import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <FidgetSpinner
        visible={true}
        height="150" // Increased height
        width="150" // Increased width
        color="#1E3A8A" // Changed color to blue (Tailwind color: blue-900)
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default Spinner;
