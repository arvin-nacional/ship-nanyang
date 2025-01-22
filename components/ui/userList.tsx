import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  name: string;
  phoneNumber: string;
  email: string;
  id: string;
  photo: string;
  address: string;
}
const UserList = ({ name, phoneNumber, id, email, photo, address }: Props) => {
  return (
    <div className=" body-regular text-dark400_light800  shadow-light300_darknone  flex w-full flex-row items-center justify-start gap-[20px] p-2 text-left max-sm:gap-[0px] border-b border-red-500">
      <div className=" flex w-full flex-1 flex-row items-center justify-between">
        <Link href={`/admin/users/${id}`}>
          <div className="flex w-[200px] flex-row items-center justify-start gap-[10px] ">
            <div className="relative h-[38px] w-[38px]">
              {photo ? (
                <Image
                  className="absolute inset-0 h-[35px] w-[35px] rounded-md object-cover object-left-top"
                  alt=""
                  src={photo}
                  width={35}
                  height={35}
                />
              ) : (
                <Image
                  className="absolute inset-[0%] h-full max-h-full w-full max-w-full overflow-hidden rounded-xl object-cover"
                  alt=""
                  src={"/assets/images/Default_photo.png"}
                  width={35}
                  height={35}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-[2px]">
              <div className="small-regular relative self-stretch leading-[16px]">
                Name
              </div>
              <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
                {name}
              </div>
            </div>
          </div>
        </Link>
        <div className="flex w-[234px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Email
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px] ">
            {email}
          </div>
        </div>
        <div className="flex w-28 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Phone
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {phoneNumber}
          </div>
        </div>
        <div className="flex w-32 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Address
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
