import Image from "next/image";
import Link from "next/link";
import React from "react";

const MessengerBtn = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href="https://www.facebook.com/messages/t/752099247989837" target="_blank">
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
