import React from "react";

interface Props {
  vendorName: string;
  description: string;
  trackingNumber: string;
  date: string;
  status: string;
}

const PackageItem = ({
  vendorName,
  description,
  trackingNumber,
  date,
  status,
}: Props) => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Vendor</p>
        <p className="body-regular ">{vendorName}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Description</p>
        <p className="body-regular ">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Tracking Number</p>
        <p className="body-regular ">{trackingNumber}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Item Value</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Date</p>
        <p className="body-regular ">{date}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Shipment Price</p>
        <p className="body-regular ">Amount</p>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p className="small-regular">Status</p>
          <p className="body-regular">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageItem;
