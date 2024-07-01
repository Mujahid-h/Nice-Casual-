import React from "react";

const Message = ({ variant, children }) => {
  return (
    <div className={`text-center my-4 p-4 border rounded ${variant}`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: "text-red-500", // default color for error messages
};

export default Message;
