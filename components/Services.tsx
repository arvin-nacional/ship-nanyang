// import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  Container,
  Plane,
  SearchCheck,
  ShoppingBag,
  ShoppingCart,
  Tractor,
  Warehouse,
  Waves,
} from "lucide-react";

export function Services() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-16">
      <p className="h1-bold text-dark-400">Our Services</p>
      <BentoGrid className="max-w-full my-16">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            image={item.image}
            icon={item.icon}
            className={""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );
const items = [
  {
    title: "International Sea Freight",
    description: "Reliable, cost-effective global shipping solutions.",
    image: "/assets/images/international-sea-freight2.png",
    icon: <Waves className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Break Bulk Shipping (LCL)",
    description: "Flexible, shared container shipping for smaller loads.",
    image: "/assets/images/bulk-shipping2.png",
    icon: <Container className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "International Express Service",
    description: "Fast, secure delivery for urgent global shipments.",
    image: "/assets/images/express-service.jpg",
    icon: <ShoppingCart className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Warehouse Service",
    description: "Safe, organized storage for goods of all sizes.",
    image: "/assets/images/warehouse-red.png",
    icon: <Warehouse className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Custom Declaration & Commodity Inspection",
    description: "Hassle-free customs compliance for smooth cargo clearance.",
    image: "/assets/images/inventory.png",
    icon: <SearchCheck className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "International Air Freight",
    description: " Quick, efficient air transport for global shipments.",
    image: "/assets/images/air-freight.jpg",
    icon: <Plane className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Pasabuy Service",
    description: "Convenient buying and delivery from international stores.",
    image: "/assets/images/pasabuy.jpg",
    icon: <ShoppingBag className="h-4 w-4 text-primary-500" />,
  },
  {
    title: "Special Goods",
    description: "Expert handling of fragile, oversized, and special items.",
    image: "/assets/images/excavator.png",
    icon: <Tractor className="h-4 w-4 text-primary-500" />,
  },

  // {
  //   title: "The Digital Revolution",
  //   description: "Dive into the transformative power of technology.",
  //   header: <Skeleton />,
  //   icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Art of Design",
  //   description: "Discover the beauty of thoughtful and functional design.",
  //   header: <Skeleton />,
  //   icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Power of Communication",
  //   description:
  //     "Understand the impact of effective communication in our lives.",
  //   header: <Skeleton />,
  //   icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Pursuit of Knowledge",
  //   description: "Join the quest for understanding and enlightenment.",
  //   header: <Skeleton />,
  //   icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Joy of Creation",
  //   description: "Experience the thrill of bringing ideas to life.",
  //   header: <Skeleton />,
  //   icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "The Spirit of Adventure",
  //   description: "Embark on exciting journeys and thrilling discoveries.",
  //   header: <Skeleton />,
  //   icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  // },
];
