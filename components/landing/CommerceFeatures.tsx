import React from "react";
import Image from "next/image";
import { FileText, Activity } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Customs Declarations Made Easy",
    description:
      "Automated harmonized code matching cuts paperwork and avoids port delay fines.",
  },
  {
    icon: Activity,
    title: "Instant REST API Integration",
    description:
      "Plug our calculator straight into your e-commerce platform for live customer quotes.",
  },
];

const CommerceFeatures = () => {
  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-wider bg-primary-500/10 rounded-full px-4 py-1.5 mb-4">
            The Nanyang Advantage
          </span>
          <h2 className="h2-title text-dark-500 mb-3">
            Engineered for Modern Borderless Commerce
          </h2>
          <p className="paragraph-regular text-slate-500">
            We combine advanced software with robust physical infrastructure to
            deliver a premier shipping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/assets/images/international-sea-freight.png"
              alt="Cargo vessel at sea"
              width={640}
              height={420}
              className="w-full h-[360px] object-cover"
            />
            {/* Red overlay */}
            <div className="absolute inset-0 bg-primary-500/60" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-bold text-lg mb-1">
                Secure Maritime Network
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                We control our vessel allocations directly, ensuring constant
                space guarantees even during peak global seasons.
              </p>
            </div>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="base-bold text-dark-500 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceFeatures;
