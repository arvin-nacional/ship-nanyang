"use client";
import React from "react";
import GridLoader from "react-spinners/GridLoader";

const loading = () => {
  return (
    <div className="flex justify-center items-center w-full mt-40">
      <GridLoader color="#BD1826" size={15} />
    </div>
  );
};

export default loading;
