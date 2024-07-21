import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <FidgetSpinner
        visible={true}
        height="100"
        width="100"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default Spinner;
