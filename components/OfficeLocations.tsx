import React from "react";
import { MapPin, Phone, Mail, Building2, Crown } from "lucide-react";

const offices = [
  {
    type: "headquarters",
    name: "RX Nanyang Ltd",
    label: "Headquarters",
    address: [
      "Room 1601, 16/F Workington Tower",
      "78 Bonham Strand",
      "Sheung Wan, Hong Kong",
    ],
    phone: "+852 6091 1394",
  },
  {
    type: "branch",
    name: "Philippines, Manila Branch",
    label: "Branch Office",
    address: [
      "26th and 27th Floors The Podium",
      "Lower, Ortigas Center, Mandaluyong",
      "1605 Metro Manila, Philippines",
    ],
    phone: "+63 966 401 6784",
    email: "info@shipnanyang.com",
  },
  {
    type: "branch",
    name: "Malaysia, Kuala Lumpur Branch",
    label: "Branch Office",
    address: [
      "Suite 9-08, 9th Floor",
      "Wisma Warisan (Heritage House)",
      "33 Jalan Yap Ah Shak",
      "50300 Kuala Lumpur",
    ],
    phone: "+852 6091 1394",
  },
];

const OfficeLocations = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="h1-bold text-dark-500 mb-4">Our Office Locations</h2>
          <p className="paragraph-regular text-dark-400 max-w-2xl mx-auto">
            With offices across Asia, we provide localized support and services
            to ensure seamless shipping operations for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offices.map((office, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                office.type === "headquarters"
                  ? "border-red-500/30 bg-red-50/30"
                  : "border-gray-100 bg-white"
              }`}
            >
              {/* Badge */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className={`p-2 rounded-full ${
                    office.type === "headquarters"
                      ? "bg-red-500/10"
                      : "bg-gray-100"
                  }`}
                >
                  {office.type === "headquarters" ? (
                    <Crown className="h-5 w-5 text-red-500" />
                  ) : (
                    <Building2 className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    office.type === "headquarters"
                      ? "text-red-500"
                      : "text-dark-400"
                  }`}
                >
                  {office.label}
                </span>
              </div>

              {/* Office Name */}
              <h3 className="text-lg font-bold text-dark-500 mb-4">
                {office.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-4 w-4 text-red-500 mt-1 shrink-0" />
                <div className="text-sm text-dark-400 leading-relaxed">
                  {office.address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < office.address.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <a
                href={`tel:${office.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 mb-3 group"
              >
                <Phone className="h-4 w-4 text-red-500 shrink-0" />
                <span className="text-sm text-dark-400 group-hover:text-red-500 transition-colors">
                  {office.phone}
                </span>
              </a>

              {/* Email (if available) */}
              {/* {office.email && (
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-3 group"
                >
                  <Mail className="h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-sm text-dark-400 group-hover:text-red-500 transition-colors">
                    {office.email}
                  </span>
                </a>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
