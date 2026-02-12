import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  Warehouse,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

const FeaturesGrid = () => {
  return (
    <div className="flex items-center justify-center max-md:px-2 max-sm:py-5 bg-gray-50 pt-20 md:pt-32">
      <div className="flex flex-col items-start justify-center max-w-[1200px] pb-20 max-md:px-4 max-sm:py-16">
        <div className="text-center w-full mb-16">
          <h2 className="h1-bold text-dark-400 mb-5 max-sm:pt-12">Our Warehouse Network</h2>
          <p className="body-regular text-dark-400 max-w-3xl mx-auto">
            Strategically located warehouses across key shipping hubs to ensure 
            efficient storage, processing, and distribution of your cargo.
          </p>
        </div>
        <BentoGrid className="max-w-full">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              image={item.image}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

const items = [
  {
    title: "Guangdong Warehouse",
    image: "/assets/images/warehouse-1.jpg",
    className: "md:col-span-1",
    icon: <Warehouse className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Fujian Warehouse",
    image: "/assets/images/warehouse-2.jpg",
    className: "md:col-span-1",
    icon: <Package className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Shanghai Warehouse",
    image: "/assets/images/warehouse-3.jpg",
    className: "md:col-span-1",
    icon: <MapPin className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Yiwu Warehouse",
    image: "/assets/images/warehouse-4.jpg",
    className: "md:col-span-1",
    icon: <Truck className="h-4 w-4 text-primary-500" />,
  },
];

export default FeaturesGrid;
