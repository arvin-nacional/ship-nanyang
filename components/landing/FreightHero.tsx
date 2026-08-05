"use client";
import React, { useState, ChangeEvent } from "react";
import { MapPin, ShieldCheck, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AIR_RATE_PER_KG = 320;
const SEA_RATE_PER_CBM = 8000;

const DESTINATIONS = [
  { label: "Manila (MNL)", value: "Manila (MNL)", days: "4 - 7 Business Days" },
  { label: "Cebu (CEB)", value: "Cebu (CEB)", days: "5 - 8 Business Days" },
  { label: "Davao (DVO)", value: "Davao (DVO)", days: "6 - 9 Business Days" },
];

const FreightHero = () => {
  const [service, setService] = useState<"sea" | "air">("sea");
  const [destination, setDestination] = useState(DESTINATIONS[0].value);
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState<{ fee: string; label: string; days: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const numericOnly =
    (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9.]/g, "");
      if (value.split(".").length > 2) return;
      setter(value);
    };

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    const dest = DESTINATIONS.find((d) => d.value === destination);
    const days = dest?.days ?? "4 - 7 Business Days";

    if (service === "sea") {
      const cbm = parseFloat(volume);
      if (!volume || isNaN(cbm) || cbm <= 0) {
        setError("Please enter a valid volume in CBM.");
        return;
      }
      const fee = cbm * SEA_RATE_PER_CBM;
      setResult({
        fee: `₱${fee.toLocaleString("en-PH", { minimumFractionDigits: 0 })} PHP`,
        label: "Sea Express Estimate",
        days,
      });
    } else {
      const kg = parseFloat(weight);
      if (!weight || isNaN(kg) || kg <= 0) {
        setError("Please enter a valid weight in kg.");
        return;
      }
      const fee = kg * AIR_RATE_PER_KG;
      setResult({
        fee: `₱${fee.toLocaleString("en-PH", { minimumFractionDigits: 0 })} PHP`,
        label: "Air Freight Estimate",
        days: "3 - 5 Business Days",
      });
    }
  };

  return (
    <section className="bg-primary-500 pt-32 pb-20 px-5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <span className="inline-block text-xs font-semibold text-white/90 uppercase tracking-widest bg-white/20 rounded-md px-3 py-1 mb-6">
            Secure &amp; Fast Cross-Border Cargo
          </span>
          <h1 className="text-4xl lg:text-5xl text-white font-extrabold mb-6 leading-tight">
            Freight Forwarding from China to the Philippines
          </h1>
          <p className="text-white/80 text-base mb-8 max-w-md leading-relaxed">
            ShipNanyang is one of the top freight forwarders in the Philippines
            that provides logistics services and solutions to all kinds of
            businesses. Get instant pricing, clear custom gates effortlessly,
            and track your goods with ease.
          </p>
          <div className="flex flex-wrap gap-6 text-white/90 text-sm">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} /> Full Cargo Insurance
            </span>
            <span className="flex items-center gap-2">
              <Activity size={16} /> Real-time GPS Tracking
            </span>
          </div>
        </div>

        {/* Right calculator card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-primary-500 mb-0.5">
            Estimate Shipping Costs
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Get instant, binding quotes across SEA routes.
          </p>

          {/* Origin / Destination */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Origin
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-sm text-dark-400">
                <MapPin size={14} className="text-primary-500 shrink-0" />
                China (CN)
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="no-focus min-h-[42px] border border-gray-200 text-sm text-dark-400 bg-gray-50">
                  <MapPin size={14} className="text-primary-500 shrink-0 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {DESTINATIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value} className="cursor-pointer">
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Weight / Volume */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Weight (kg)
              </label>
              <Input
                className="min-h-[42px] border border-gray-200 bg-gray-50 text-sm"
                placeholder="15.5"
                value={weight}
                onChange={numericOnly(setWeight)}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Volume (CBM)
              </label>
              <Input
                className="min-h-[42px] border border-gray-200 bg-gray-50 text-sm"
                placeholder="0.24"
                value={volume}
                onChange={numericOnly(setVolume)}
                inputMode="decimal"
              />
            </div>
          </div>

          {/* Service Speed toggle */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Service Speed
            </label>
            <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setService("sea")}
                className={`py-2.5 text-sm font-semibold transition-colors ${
                  service === "sea"
                    ? "text-primary-500 bg-white"
                    : "text-slate-400 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                Sea Cargo
              </button>
              <button
                type="button"
                onClick={() => setService("air")}
                className={`py-2.5 text-sm font-semibold transition-colors border-l border-gray-200 ${
                  service === "air"
                    ? "text-primary-500 bg-white"
                    : "text-slate-400 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                Air Freight
              </button>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full min-h-[48px] rounded-lg bg-primary-500 hover:bg-primary-600 !text-white font-semibold text-sm mb-3"
          >
            Calculate Est. Shipping
          </Button>

          {error && (
            <p className="text-sm text-red-500 text-center mb-2">{error}</p>
          )}

          {result && (
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-500">{result.label}</span>
                <span className="text-lg font-extrabold text-primary-500">
                  {result.fee}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-dark-400">
                <Clock size={13} className="text-primary-500" />
                Expected delivery: {result.days}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreightHero;
