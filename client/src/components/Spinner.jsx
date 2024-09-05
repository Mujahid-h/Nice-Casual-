import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="1"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
