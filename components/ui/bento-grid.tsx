import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-auto grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col space-y-4",
        className
      )}
    >
      <Image
        src={image}
        alt="international-sea-freight"
        width={400}
        height={300}
        className="rounded-md"
      />
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="base-medium text-dark-400 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="body-regular text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
