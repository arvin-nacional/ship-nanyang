import React from "react";
import { Anchor, Truck, Send, CheckCircle2 } from "lucide-react";

const OPTIONS = [
  {
    icon: Anchor,
    title: "LCL Sea Consolidation",
    highlighted: false,
    features: [
      "Economical for bulk items",
      "Port-to-Port & Door-to-Door options",
      "Customs clearance assistance",
      "Flat-rate pricing schemes",
    ],
  },
  {
    icon: Truck,
    title: "SEA Cargo Express",
    highlighted: true,
    features: [
      "Ideal balance of cost & speed",
      "Daily container dispatches",
      "Full end-to-end GPS tracing",
      "Dedicated regional support",
    ],
  },
  {
    icon: Send,
    title: "Next-Flight Air Freight",
    highlighted: false,
    features: [
      "Ultra-fast urgent shipping",
      "Strict environmental controls",
      "Priority customs priority line",
      "Best for premium electronics",
    ],
  },
];

const DeliveryOptions = () => {
  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-wider bg-primary-500/10 rounded-full px-4 py-1.5 mb-4">
            Shipping Options
          </span>
          <h2 className="h2-title text-dark-500 mb-3">
            Door to Door Delivery From China to the Philippines
          </h2>
          <p className="paragraph-regular text-slate-500">
            From small parcels to bulky industrial cargo, select the speed and
            capacity that aligns with your budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className={`relative rounded-2xl p-8 transition-shadow hover:shadow-lg ${
                  option.highlighted
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                {option.highlighted && (
                  <span className="absolute top-6 right-6 bg-white/20 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                    Popular
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    option.highlighted ? "bg-dark-500/20" : "bg-primary-500/10"
                  }`}
                >
                  <Icon
                    size={22}
                    className={option.highlighted ? "text-white" : "text-primary-500"}
                  />
                </div>
                <h3
                  className={`h3-bold mb-5 ${
                    option.highlighted ? "text-white" : "text-dark-500"
                  }`}
                >
                  {option.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        option.highlighted ? "text-white/90" : "text-slate-500"
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          option.highlighted ? "text-white/70" : "text-green-500"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeliveryOptions;
