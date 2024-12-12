import RightSidebar from "@/components/RightSidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full">
      <div className="p-6 w-full" style={{ height: "100vh" }}>
        page
      </div>
      <RightSidebar />
    </div>
  );
};

export default page;
