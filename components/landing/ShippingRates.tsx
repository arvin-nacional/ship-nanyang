import React from "react";
import { ShoppingBag, Package, Award, BadgePercent } from "lucide-react";

const ShippingRates = () => {
  return (
    <section className="py-16 px-5 primary-gradient">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="h2-title text-white mb-3">Shipping Rates</h2>
        <p className="text-sm text-white/80 max-w-xl mx-auto mb-10">
          Transparent pricing for every shipment - no hidden fees, just
          reliable freight forwarding services from China to the Philippines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Per Kilogram */}
          <div className="relative bg-white rounded-2xl p-8 shadow-lg">
            <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
              <Award size={12} /> Best Value
            </span>
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-5">
              <ShoppingBag className="text-primary-500" size={24} />
            </div>
            <p className="text-sm font-semibold text-dark-500 mb-2">
              Per Kilogram
            </p>
            <p className="text-3xl lg:text-4xl font-extrabold text-primary-500">
              ₱320 / KG
            </p>
            <p className="text-xs text-slate-500 mt-4">
              All routes from China to Philippines
            </p>
          </div>

          {/* Per Cubic Meter */}
          <div className="relative bg-white rounded-2xl p-8 shadow-lg">
            <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold text-primary-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
              <BadgePercent size={12} /> Lowest Rates
            </span>
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-5">
              <Package className="text-primary-500" size={24} />
            </div>
            <p className="text-sm font-semibold text-dark-500 mb-2">
              Per Cubic Meter
            </p>
            <p className="text-3xl lg:text-4xl font-extrabold text-primary-500">
              ₱8,000 / CBM
            </p>
            <p className="text-xs text-slate-500 mt-4">
              Volume-based sea freight
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingRates;
