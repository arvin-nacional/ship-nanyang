import { ProcessCardProps, SidebarLink, SolutionsCardProps } from "@/app/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    label: "Home",
    route: "/",
  },
  {
    imgURL: "/assets/icons/about.svg",
    label: "About",
    route: "/#about",
  },
  {
    imgURL: "/assets/icons/portfolio.svg",
    label: "Portfolio",
    route: "/projects",
  },
  {
    imgURL: "/assets/icons/blog.svg",
    label: "Blog",
    route: "/blog",
  },
  {
    imgURL: "/assets/icons/services.svg",
    label: "Services",
    route: "/#services",
  },
  {
    imgURL: "/assets/icons/send-2.svg",
    label: "Contact",
    route: "/contact",
  },
];

export const solutions: SolutionsCardProps[] = [
  {
    id: 1,
    icon: "/assets/icons/solution-1.svg",
    title: "International Shipping from China to the Philippines",
    content:
      "Safe and reliable delivery from China straight to your home in the Philippines.",
  },
  {
    id: 2,
    icon: "/assets/icons/solution-2.svg",
    title: "Easy Account Management and Tracking",
    content:
      "Access your personal dashboard to track shipments, manage your orders, and receive updates.",
  },
  {
    id: 3,
    icon: "/assets/icons/solution-3.svg",
    title: "Cost-Effective, Transparent Fees",
    content:
      "We offer competitive shipping rates and transparent pricing, so you know exactly what you’re paying.",
  },
  {
    id: 4,
    icon: "/assets/icons/solution-4.svg",
    title: "Secure Delivery to Your Doorstep",
    content:
      "Your order arrives directly at your door, ensuring a smooth experience from purchase to delivery.",
  },
];

export const whyUs: SolutionsCardProps[] = [
  {
    id: 1,
    icon: "/assets/icons/hand.svg",
    title: "Convenience",
    content:
      "With just a few clicks, you can shop from any China-based store and leave the rest to us.",
  },
  {
    id: 2,
    icon: "/assets/icons/secure-shield.svg",
    title: "Security",
    content:
      "Your shipments are handled with care and tracked at every stage to ensure safe delivery.",
  },
  {
    id: 3,
    icon: "/assets/icons/philippine-peso.svg",
    title: "Affordability",
    content:
      "We offer competitive rates with no hidden charges, so you always know what you’re paying for.",
  },
  {
    id: 4,
    icon: "/assets/icons/reliability.svg",
    title: "Reliability",
    content:
      "Our dedicated team ensures your orders are delivered on time, every time.",
  },
];

export const process: ProcessCardProps[] = [
  {
    id: 1,
    icon: "/assets/icons/process-1.svg",
    title: "Create Your Account",
    content: "Sign up to get your personal China shipping address.",
  },
  {
    id: 2,
    icon: "/assets/icons/process-2.svg",
    title: "Shop from any China Store",
    content: "Find the products you love and order as usual.",
  },
  {
    id: 3,
    icon: "/assets/icons/process-3.svg",
    title: "Ship to Our Warehouse",
    content:
      "Use our China address at checkout to send items to our warehouse.",
  },
  {
    id: 4,
    icon: "/assets/icons/process-4.svg",
    title: "Get Your Shipment at your Door",
    content:
      "We handle the delivery to bring your order straight to your doorstep.",
  },
];
