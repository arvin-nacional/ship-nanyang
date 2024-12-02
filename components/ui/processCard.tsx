import Image from "next/image";
import React from "react";
interface Props {
  id: number;
  title: string;
  content: string;
  icon: string;
}
const ProcessCard = ({ id, title, content, icon }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[20px] max-md:w-full md:w-[250px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex size-8 items-center justify-center rounded-[50%] bg-primary-500">
          <p className="h3-bold text-white">{id}</p>
        </div>

        <Image
          src={icon}
          alt="process-1"
          height={110}
          width={110}
          className="hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </div>
      <p className="h2-bold w-[220px] text-center">{title}</p>
      <p className="paragraph-regular text-center text-dark-400">{content}</p>
    </div>
  );
};

export default ProcessCard;
