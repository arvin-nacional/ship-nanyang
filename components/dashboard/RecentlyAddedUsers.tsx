import { getRecentUsers } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentlyAddedUsers = async () => {
  const result = await getRecentUsers();

  return (
    <div className="background-light800_darkgradient text-dark300_light900 max-w-sm  rounded p-5 text-left text-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex flex-col items-start justify-between">
        <div className="mb-2 flex w-[326px] items-center justify-between gap-[22px]">
          <div className="font-semibold">Recently Added Users</div>
          <div className=" rounded-md px-0 py-2 text-dark-400">
            <Link href="/admin/users" className="subtle-medium ">
              View All
            </Link>
          </div>
        </div>
        {result?.users.map((user) => (
          <div
            key={user._id}
            className="mb-2 flex w-[326px] items-center gap-[10px] mx-2"
          >
            <Link href={`/admin/users/${user._id}`}>
              <div className=" relative h-[50px] w-[50px] overflow-hidden">
                <Image
                  className="absolute inset-0 h-[50px] w-[50px] rounded-lg object-cover object-left-top"
                  alt=""
                  src={user.picture}
                  height={50}
                  width={50}
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <div className="flex h-[20px] w-full items-center justify-between">
                <Link href={`/admin/users/${user._id}`}>
                  <div className="paragraph-medium">
                    {user.firstName + " " + user.lastName}
                  </div>
                </Link>
                {/* <MemberButton memberId={member.id} /> */}
              </div>
              <div className="body-regular text-dark-500 relative text-sm font-light">
                {user.address?.city}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedUsers;
