"use client";
import Footer from "@/components/Footer";
import React from "react";
import GridLoader from "react-spinners/GridLoader";

const loading = () => {
  return (
    <main className="background-light900_dark200 relative">
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto justify-center items-center w-full mt-20">
        <div className="flex justify-center items-center ">
          <GridLoader color="#BD1826" size={15} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default loading;
