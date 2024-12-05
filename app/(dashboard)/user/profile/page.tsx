import React from "react";

const page = () => {
  return (
    <div className="p-12 w-full" style={{ height: "100vh" }}>
      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Name</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Full Name
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Email</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Email Address
          </p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-5">
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Contact Number</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Contact Number
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="paragraph-regular">Email</span>
          <p className="w-full py-3 border px-5 border-light-100 rounded-xl paragraph-regular text-dark-500">
            Email Address
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
