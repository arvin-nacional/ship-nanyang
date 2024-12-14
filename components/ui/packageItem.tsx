import React from "react";

const PackageItem = () => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Vendor</p>
        <p className="body-regular ">Vendor Name</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Description</p>
        <p className="body-regular ">Description</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Tracking Number</p>
        <p className="body-regular ">Tracking Number</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Item Value</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Date</p>
        <p className="body-regular ">Dec 13, 2024</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Shipment Price</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p className="small-regular">Status</p>
          <p className="body-regular">status</p>
        </div>
      </div>
    </div>
  );
};

export default PackageItem;
