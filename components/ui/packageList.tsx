import Link from "next/link";
import React from "react";

interface Props {
  packageName: string;
  status: string;
  packageId: string;
}

const PackageList = ({ packageName, status, packageId }: Props) => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-5 flex-wrap justify-between">
      <div className="flex flex-col gap-2">
        <p className="small-regular">Package Name</p>
        <Link href={`/user/packages/${packageId}`}>
          {" "}
          <p className="body-regular hover:text-primary-500">{packageName}</p>
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p className="small-regular">Status</p>
          <p className="body-regular">{status}</p>
        </div>

        {/* <Button className=" text-primary-500 ">Pay</Button> */}
      </div>
    </div>
  );
};

export default PackageList;
