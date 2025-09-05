import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
// import Image from "next/image";

const NewHero = () => {
  return (
    <section className="relative flex h-screen w-full items-center justify-center px-16 py-10 pb-14 max-md:px-10 max-md:py-20">
      <Image
        src="/assets/images/new-bg.png"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

    <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-sm text-white border border-white rounded-xl px-3 py-1">
              Global Shipping Solutions
            </Badge>
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 text-balance">
              Ship Anywhere, Anytime with Confidence
            </h1>
            <p className="text-xl text-gray-200 mb-8 text-pretty max-w-2xl mx-auto">
              Professional freight forwarding services connecting your business to the world through reliable sea cargo
              and air freight solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shipping-calculator"><Button size="lg" className="text-lg px-8 bg-white text-primary-500 hover:bg-gray-200 hover:text-primary-500">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button></Link>
              <Link href="/signin"><Button variant="outline" size="lg" className="text-lg px-8 bg-transparent hover:bg-gray-200 hover:text-primary-500 text-white">
                Track Shipment
                <Package className="ml-2 h-5 w-5" />
              </Button></Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default NewHero;
