import React from "react";

const PackageListItem = () => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Order Name</p>
        <p className="body-regular">SD-#1001</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Order Date</p>
        <p className="body-regular">05 DEC 2024</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Order Status</p>
        <p className="body-regular">Received</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Recipient</p>
        <p className="body-regular">Arvin Paul Nacional</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Invoice</p>
        <p className="body-regular">Invoice Details</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Amount</p>
        <p className="body-regular">305 PHP</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Payment Status</p>
        <p className="body-regular">Pending</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Tracking #</p>
        <p className="body-regular">05412345</p>
      </div>
    </div>
  );
};

export default PackageListItem;
