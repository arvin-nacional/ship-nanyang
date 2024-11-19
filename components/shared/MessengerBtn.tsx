import Image from "next/image";
import Link from "next/link";
import React from "react";

const MessengerBtn = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href="https://m.me/sdexpressinternational" target="_blank">
        <Image
          src="/assets/icons/messenger.svg"
          alt="messengerButton"
          height={50}
          width={50}
        />
      </Link>
    </div>
  );
};

export default MessengerBtn;
