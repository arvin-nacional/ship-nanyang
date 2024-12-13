import React from "react";
// import { Button } from "./button";

interface Props {
  recipient: string;
  date: string;
  paymentStatus: string;
  trackingNumber: string;
  packageName: string;
  status: string;
}

const PackageListItem = ({
  recipient,
  date,
  paymentStatus,
  trackingNumber,
  packageName,
  status,
}: Props) => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Order Name</p>
        <p className="body-regular">{packageName}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Date</p>
        <p className="body-regular">{date}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Status</p>
        <p className="body-regular">{status}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Recipient</p>
        <p className="body-regular">{recipient}</p>
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
        <p className="body-regular">{paymentStatus}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="small-regular">Tracking #</p>
        <p className="body-regular">{trackingNumber}</p>
      </div>
      {/* <Button className="border border-primary-500 rounded-3xl text-primary-500 ">
        Upload Payment
      </Button> */}
    </div>
  );
};

export default PackageListItem;
