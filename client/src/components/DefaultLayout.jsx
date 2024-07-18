import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
