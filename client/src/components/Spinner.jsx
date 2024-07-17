import React from "react";
import { Hourglass } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Hourglass
        visible={true}
        height="120"
        width="120"
        ariaLabel="hourglass-loading"
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
};

export default Spinner;
