import Image from "next/image";
import React from "react";

interface Props {
  icon: string;
  title: string;
  content: string;
}

const SolutionsCard = ({ icon, title, content }: Props) => {
  return (
    <div className="flex w-full items-center gap-3">
      <Image alt="solution-1" height={65} width={65} src={icon} />{" "}
      <div>
        <h3 className="h3-semibold text-dark-200">{title}</h3>
        <p className="paragraph-regular">{content}</p>
      </div>
    </div>
  );
};

export default SolutionsCard;
