"use client";
import React from "react";
import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <GridLoader color="#3B82F6" size={15} />
    </div>
  );
};

export default Loading;
