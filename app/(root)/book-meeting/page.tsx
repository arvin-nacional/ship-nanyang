import React from "react";
import BookingForm from "@/components/forms/BookingForm";
import {
  CheckCircle2,
  Clock,
  Shield,
  TrendingDown,
  Globe2,
  Headphones,
  Star,
  CalendarCheck,
  MessageSquare,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Book a Free Consultation | SD Express",
  description:
    "Schedule a free 30-minute consultation with our shipping experts. Get a custom quote and strategy tailored to your business.",
};

const benefits = [
  {
    icon: TrendingDown,
    title: "Save up to 40% on shipping",
    description:
      "Our consolidation network and direct freight channels cut costs without compromising speed.",
  },
  {
    icon: Clock,
    title: "Faster, reliable delivery",
    description:
      "Independent air & sea freight routes with predictable transit times you can plan around.",
  },
  {
    icon: Globe2,
    title: "Global coverage",
    description:
      "China, Hong Kong, Taiwan, Southeast Asia, Europe, North America, and the Middle East.",
  },
  {
    icon: Shield,
    title: "Zero hidden fees",
    description:
      "Transparent pricing upfront. No surprise surcharges when your shipment arrives.",
  },
  {
    icon: Headphones,
    title: "Dedicated account manager",
    description:
      "24/7 one-on-one support from a real person who knows your business.",
  },
  {
    icon: CheckCircle2,
    title: "Full tracking visibility",
    description:
      "Our smart platform shows you exactly where every package is, in real time.",
  },
];

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book your slot",
    description:
      "Pick a date and time that works for you. It takes less than 60 seconds.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Free 30-min call",
    description:
      "Tell us about your shipping needs. We'll build a custom strategy and quote on the spot.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Start shipping smarter",
    description:
      "Approve the plan and we handle the rest. Your first shipment can move within days.",
  },
];

const faqs = [
  {
    q: "Is the consultation really free?",
    a: "Yes, 100% free. No obligation, no credit card, no pressure. We only win when we help you ship better.",
  },
  {
    q: "How long does the meeting take?",
    a: "Typically 20-30 minutes. Enough time to understand your needs and give you real, actionable recommendations.",
  },
  {
    q: "What will we discuss?",
    a: "Your current shipping setup, pain points, volume, origin and destination countries, and a custom plan to save you time and money.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Absolutely. Whether you ship 10 packages a month or 10,000, our consolidation network scales to match your volume.",
  },
  {
    q: "What if I miss my booking?",
    a: "No problem. Just email us at info@shipnanyang.com and we'll reschedule instantly.",
  },
];

const testimonials = [
  {
    quote:
      "Cut our shipping costs by nearly 35% in the first quarter. The team genuinely cares about our margins.",
    name: "Maria L.",
    role: "E-commerce Founder",
  },
  {
    quote:
      "Finally found a forwarder that actually picks up the phone. Game-changer for our import business.",
    name: "David C.",
    role: "Import/Export Manager",
  },
  {
    quote:
      "The consolidation service alone paid for itself in the first month. Highly recommended.",
    name: "James K.",
    role: "Retail Business Owner",
  },
];

const page = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">
            {/* Left - Copy */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 text-primary-500 text-sm font-semibold rounded-full mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Free shipping audit · No sales pitch
              </span>
              <h1 className="h1-bold text-dark-500 mb-5 leading-tight">
                Most businesses overpay for shipping from China by up to{" "}
                <span className="text-primary-500">40%.</span>
              </h1>
              <p className="paragraph-regular text-dark-400 mb-8 max-w-xl">
                Your margins are bleeding. Your ETAs are slipping. Your
                forwarder won&apos;t answer the phone. In 30 minutes, we&apos;ll
                show you exactly where you&apos;re losing money — and how to
                fix it.
              </p>

              {/* Quick pain-relief points */}
              <div className="space-y-3 mb-8">
                {[
                  "Find the hidden fees draining your margins",
                  "Get a transparent quote with zero surprises",
                  "Walk away with a plan — even if you don't ship with us",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2
                        size={14}
                        className="text-green-600"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-dark-400 paragraph-regular">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className={`h-9 w-9 rounded-full border-2 border-white ${color}`}
                      />
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-dark-400">
                    <strong>500+ businesses</strong> booked this month
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Booking Form */}
            <div id="booking-form" className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-red-300/20 rounded-3xl blur-2xl -z-10" />
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
                <div className="mb-6 pb-5 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-dark-500 mb-1">
                    Book Your Free Call
                  </h2>
                  <p className="text-sm text-dark-400">
                    Takes 60 seconds. We&apos;ll reply within 24 hours.
                  </p>
                </div>
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="h2-bold text-dark-500 mb-4">
                What you get from this call
              </h2>
              <p className="paragraph-regular text-dark-400">
                Not a sales pitch. A real working session with experienced
                logistics experts who&apos;ve moved millions of packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-500/30 hover:shadow-lg transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                    <b.icon size={22} className="text-primary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-500 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-dark-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="h2-bold text-dark-500 mb-4">
                How it works
              </h2>
              <p className="paragraph-regular text-dark-400">
                Three simple steps. Zero friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <div className="absolute -top-4 -left-2 text-6xl font-bold text-primary-500/10 select-none">
                    {step.number}
                  </div>
                  <div className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-primary-500 flex items-center justify-center mb-5 shadow-lg">
                      <step.icon size={26} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-500 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-dark-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="h2-bold text-dark-500 mb-4">
                Trusted by growing businesses
              </h2>
              <p className="paragraph-regular text-dark-400">
                Here&apos;s what they say after their first call.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-dark-400 leading-relaxed mb-5 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-semibold text-dark-500">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="h2-bold text-dark-500 mb-4">
                Frequently asked questions
              </h2>
              <p className="paragraph-regular text-dark-400">
                Everything you need to know before your call.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                    <h3 className="font-semibold text-dark-500 pr-4">
                      {faq.q}
                    </h3>
                    <span className="shrink-0 h-7 w-7 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center text-xl font-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-dark-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-400">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2-bold text-white mb-4">
              Ready to ship smarter?
            </h2>
            <p className="paragraph-regular text-white/90 mb-8">
              Join hundreds of businesses saving time and money with SD Express.
              Book your free call now — no strings attached.
            </p>
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <CalendarCheck size={20} />
              Book My Free Call
            </a>
            <p className="text-white/70 text-sm mt-5">
              100% free · No credit card · 30 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
