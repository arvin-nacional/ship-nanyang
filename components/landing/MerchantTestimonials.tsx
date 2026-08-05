import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Liyana Tan",
    role: "E-commerce Founder, SG",
    avatar: "/assets/images/default_user.svg",
    quote:
      "The shipping calculator is amazingly accurate. Our customer delivery estimates match perfectly with reality. No hidden fees or unexpected container delays.",
  },
  {
    name: "Raymond Hartono",
    role: "Retail Director, Jakarta",
    avatar: "/assets/images/default_user.svg",
    quote:
      "Customs clearing into Indonesia used to be a major headache. ShipNanyang completely handles the regional compliance for us automatically.",
  },
];

const MerchantTestimonials = () => {
  return (
    <section className="py-16 px-5 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold text-primary-500 uppercase tracking-wider bg-primary-500/10 rounded-full px-4 py-1.5 mb-4">
            Customer Reviews
          </span>
          <h2 className="h2-title text-dark-500 mb-3">
            Trusted by Cross-Border Merchants
          </h2>
          <p className="paragraph-regular text-slate-500">
            Hear from business owners who have scaled their operations utilizing
            ShipNanyang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-gray-50 border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-primary-500"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover bg-gray-200"
                />
                <div>
                  <p className="font-bold text-dark-500 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchantTestimonials;
