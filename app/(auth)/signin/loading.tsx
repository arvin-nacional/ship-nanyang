import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const loading = () => {
  return (
    <main className="background-light900_dark200 relative">
      <section className="flex py-12 flex-1 flex-col overflow-y-auto justify-center items-center w-full mt-20 h-[90vh]">
        <div className="text-center text-white">
          <svg
            className="w-16 h-16 animate-spin text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;1"
                values="0 50 50;360 50 50"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      </section>
    </main>
  );
};

export default loading;
