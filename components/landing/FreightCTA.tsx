import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FreightCTA = () => {
  return (
    <section className="py-16 px-5 bg-primary-500">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="h2-title text-white mb-3">
          Ready to Simplify Your SEA Logistics?
        </h2>
        <p className="paragraph-regular text-white/80 max-w-xl mx-auto mb-8">
          Sign up today and get 15% off your first cargo delivery. Connect with
          our logistics coordinators for free, custom bulk quote arrangements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="px-8 rounded-3xl bg-white text-primary-500 hover:bg-gray-100 font-semibold"
            >
              Sign Up Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              className="px-8 rounded-3xl bg-primary-600 text-white/90 hover:bg-primary-700 font-semibold border-0"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreightCTA;
