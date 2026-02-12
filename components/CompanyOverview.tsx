"use client";

import React from "react";
import { 
  Globe2, 
  Warehouse, 
  Users2, 
  Headphones, 
  Plane, 
  Ship, 
  Smartphone,
  PackageCheck,
  TrendingUp,
  MapPin
} from "lucide-react";

const CompanyOverview = () => {
  const stats = [
    { 
      value: "12+", 
      label: "Years of Experience", 
      icon: TrendingUp 
    },
    { 
      value: "10,000+", 
      label: "Sqm Warehouse", 
      icon: Warehouse 
    },
    { 
      value: "200+", 
      label: "Team Members", 
      icon: Users2 
    },
    { 
      value: "24/7", 
      label: "Customer Support", 
      icon: Headphones 
    },
  ];

  const features = [
    {
      icon: Globe2,
      title: "Global Consolidation Network",
      description: "Serving Taiwan, Hong Kong, Southeast Asia, Europe, North America, and beyond with comprehensive package consolidation and forwarding services."
    },
    {
      icon: Warehouse,
      title: "State-of-the-Art Facilities",
      description: "Our professional consolidation warehouse spans over 10,000 square meters, equipped with intelligent warehouse management systems for efficient operations."
    },
    {
      icon: Smartphone,
      title: "Smart Technology Platform",
      description: "Our proprietary logistics system enables easy mobile ordering and provides full tracking visibility throughout the entire shipping journey."
    },
    {
      icon: PackageCheck,
      title: "Independent Logistics Channels",
      description: "We've established our own air freight and sea freight channels, ensuring stable transit times and reliable delivery schedules."
    },
  ];

  const regions = [
    "Taiwan (China)",
    "Hong Kong (China)", 
    "Southeast Asia",
    "Europe",
    "North America"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white md:pt-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-500 text-sm font-semibold rounded-full mb-4">
            About Ship Nanyang
          </span> */}
          <h2 className="h1-bold mb-4 text-dark-500 max-sm:pt-12">
            Your Trusted Global Logistics Partner
          </h2>
          <p className="paragraph-regular text-dark-400 max-w-3xl mx-auto">
            With over a decade of expertise in international logistics, we deliver seamless package 
            consolidation and forwarding services that connect businesses and individuals worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-500/30"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-500/10 rounded-full mb-4 group-hover:bg-red-500/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-dark-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Left - Company Description */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-dark-500 mb-4 flex items-center gap-3">
                <Globe2 className="h-7 w-7 text-red-500" />
                Our Story
              </h3>
              <p className="text-dark-400 leading-relaxed mb-4">
                Ship Nanyang is an international logistics company dedicated to providing global package 
                consolidation and forwarding services. With <strong className="text-red-600">12 years of development</strong>, 
                we specialize in consolidated shipping logistics connecting major regions across the globe.
              </p>
              <p className="text-dark-400 leading-relaxed">
                Our company brings together a strong R&D technical team and operations service team, 
                having independently developed our proprietary logistics consolidation system that powers 
                our efficient, customer-centric operations.
              </p>
            </div>

            {/* Regions Served */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-dark-500">
                <MapPin className="h-5 w-5 text-red-500" />
                Regions We Serve
              </h4>
              <div className="flex flex-wrap gap-2">
                {regions.map((region, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-red-500/20"
              >
                <div className="p-2.5 bg-red-500/10 rounded-lg w-fit mb-3">
                  <feature.icon className="h-5 w-5 text-red-500" />
                </div>
                <h4 className="font-semibold text-dark-500 mb-2">{feature.title}</h4>
                <p className="text-sm text-dark-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Highlights */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left md:border-r border-gray-200 md:pr-8">
              <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4">
                <Plane className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="text-lg font-bold text-dark-500 mb-2">Air Freight</h4>
              <p className="text-dark-400 text-sm">
                Fast and reliable air shipping with stable transit times for time-sensitive deliveries.
              </p>
            </div>
            
            <div className="text-center md:text-left md:border-r border-gray-200 md:pr-8">
              <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4">
                <Ship className="h-8 w-8 text-red-500" />
              </div>
              <h4 className="text-lg font-bold text-dark-500 mb-2">Sea Freight</h4>
              <p className="text-dark-400 text-sm">
                Cost-effective ocean shipping solutions for larger shipments with guaranteed schedules.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4">
                <Headphones className="h-8 w-8 text-red-400" />
              </div>
              <h4 className="text-lg font-bold text-dark-500 mb-2">30+ Support Staff</h4>
              <p className="text-dark-400 text-sm">
                Dedicated customer service representatives providing 24-hour one-on-one support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
