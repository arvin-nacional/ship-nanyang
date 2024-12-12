import React from "react";
import { Button } from "./button";

const PackageListItem = () => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Package Name</p>
        <p className="body-regular">SD-#1001</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Date</p>
        <p className="body-regular">05 DEC 2024</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Status</p>
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
      <Button className="border border-primary-500 rounded-3xl text-primary-500 ">
        Upload Payment
      </Button>
    </div>
  );
};

export default PackageListItem;
