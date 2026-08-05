import React from "react";
import { ArrowRight } from "lucide-react";

const ROUTES = [
  { origin: "China (CN)", destination: "Manila (MNL)", service: "Sea Express", estTime: "4-6 Days", price: "₱320 PHP/KG" },
  { origin: "China (CN)", destination: "Cebu (CEB)", service: "Sea Express", estTime: "5-7 Days", price: "₱320 PHP/KG" },
  { origin: "China (CN)", destination: "Davao (DVO)", service: "Sea Economy", estTime: "6-8 Days", price: "₱320 PHP/KG" },
  { origin: "Manila (MNL)", destination: "Cebu (CEB)", service: "Sea Express", estTime: "1-2 Days", price: "₱320 PHP/KG" },
  { origin: "Manila (MNL)", destination: "Davao (DVO)", service: "Sea Express", estTime: "2-3 Days", price: "₱320 PHP/KG" },
  { origin: "Cebu (CEB)", destination: "Davao (DVO)", service: "Sea Economy", estTime: "1-2 Days", price: "₱320 PHP/KG" },
];

const ShippingRoutes = () => {
  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-wider bg-primary-500/10 rounded-full px-4 py-1.5 mb-4">
            Supported Regions
          </span>
          <h2 className="h2-title text-dark-500 mb-3">
            China to Philippines Daily Shipping Routes
          </h2>
          <p className="paragraph-regular text-slate-500">
            Optimized schedules connecting China and key Philippine cities —
            Manila, Cebu, and Davao.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROUTES.map((route) => (
            <div
              key={`${route.origin}-${route.destination}`}
              className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-dark-500">{route.origin}</p>
                  <ArrowRight size={14} className="text-slate-400 shrink-0" />
                  <p className="text-sm font-bold text-dark-500">{route.destination}</p>
                </div>
                <span className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {route.service}
                </span>
              </div>
              <div className="flex items-end justify-between px-5 py-4">
                <div>
                  <p className="text-xs text-slate-400">Est. Time</p>
                  <p className="text-sm font-bold text-dark-500">{route.estTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Starts at</p>
                  <p className="text-lg font-bold text-primary-500">{route.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingRoutes;
