import React from "react";

const STEPS = [
  {
    number: "01",
    title: "Calculate & Book",
    description:
      "Use our shipping calculator to get an instant estimate, then book your shipment online or through our team.",
  },
  {
    number: "02",
    title: "Drop Off or Pick Up",
    description:
      "Send your cargo to our China warehouse or schedule a supplier pick-up. We consolidate, inspect, and prepare it for export.",
  },
  {
    number: "03",
    title: "Express Delivery",
    description:
      "We handle customs clearance and deliver door-to-door anywhere in the Philippines with real-time tracking.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-wider bg-primary-500/10 rounded-full px-4 py-1.5 mb-4">
            HOW IT WORKS
          </span>
          <h2 className="h2-title text-dark-500 mb-3">
            Calculate, Ship & Relax in 3 Steps
          </h2>
          <p className="paragraph-regular text-dark-400">
            We have automated the complexities of freight forwarding so you can
            focus on expanding your reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-gray-100 bg-light-850 p-8 hover:shadow-md transition-shadow"
            >
              <p className="text-5xl font-extrabold text-primary-500/80 mb-4">
                {step.number}
              </p>
              <h3 className="h3-bold text-dark-500 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
