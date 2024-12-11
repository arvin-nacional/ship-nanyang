import { Edit, MapPinHouse, Phone, User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  contactNumber: string;
  postalCode: string;
  addressId: string;
}

const AddressItem = ({
  name,
  addressLine1,
  addressLine2,
  city,
  province,
  contactNumber,
  postalCode,
  addressId,
}: Props) => {
  return (
    <div className="p-5 shadow-lg rounded-2xl flex justify-between items-center">
      <div className="flex flex-row gap-5 items-center">
        <MapPinHouse className="text-primary-500" size={40} />

        <div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-5 items-end">
              <p className="base-semibold text-dark-400">{name}</p>

              <div className="flex flex-row gap-2 items-center">
                <Phone size={16} className=" text-gray-500" />
                <p className="paragraph-regular text-dark-500">
                  {contactNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="paragraph-regular">{addressLine1}</p>

            <p className="paragraph-regular">{addressLine2}</p>
            <p className="paragraph-regular">{city}</p>
            <p className="paragraph-regular">{province}</p>
            <p className="paragraph-regular">{postalCode}</p>
          </div>
        </div>
      </div>
      <Link href={`/user/address/edit/${addressId}`}>
        <div>
          <Edit className="text-green-600 mt-2" size={24} />
          <p className="small-regular text-gray-400">Edit</p>
        </div>
      </Link>
    </div>
  );
};

export default AddressItem;
