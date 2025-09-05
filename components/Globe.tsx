"use client";
import React from "react";
import { World } from "./ui/globe";
import type { GlobeConfig } from "./ui/globe";

const Globe = () => {
  const globeConfig: GlobeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#ef4444", "#dc2626", "#b91c1c"]; // Red color variants
  
  const sampleArcs = [
    // Southeast Asia
    { order: 1, startLat: 22.3193, startLng: 114.1694, endLat: 14.5995, endLng: 120.9842, arcAlt: 0.1, color: colors[0] }, // Philippines
    { order: 2, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: colors[1] }, // Singapore
    { order: 3, startLat: 22.3193, startLng: 114.1694, endLat: -6.2088, endLng: 106.8456, arcAlt: 0.3, color: colors[2] }, // Indonesia
    { order: 4, startLat: 22.3193, startLng: 114.1694, endLat: 13.7563, endLng: 100.5018, arcAlt: 0.3, color: colors[0] }, // Thailand
    { order: 5, startLat: 22.3193, startLng: 114.1694, endLat: 21.0285, endLng: 105.8542, arcAlt: 0.2, color: colors[1] }, // Vietnam
    { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: colors[2] }, // Malaysia
    { order: 7, startLat: 22.3193, startLng: 114.1694, endLat: 4.9031, endLng: 114.9398, arcAlt: 0.2, color: colors[0] }, // Brunei
    { order: 8, startLat: 22.3193, startLng: 114.1694, endLat: 11.5564, endLng: 104.9282, arcAlt: 0.2, color: colors[1] }, // Cambodia
  
    // Middle East
    { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: 25.276987, endLng: 55.296249, arcAlt: 0.4, color: colors[2] }, // Dubai
    { order: 10, startLat: 22.3193, startLng: 114.1694, endLat: 24.4539, endLng: 54.3773, arcAlt: 0.4, color: colors[0] }, // Abu Dhabi
    { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 24.7136, endLng: 46.6753, arcAlt: 0.5, color: colors[1] }, // Riyadh
  
    // South Asia
    { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 28.6139, endLng: 77.2090, arcAlt: 0.4, color: colors[2] }, // India (New Delhi)
    { order: 13, startLat: 22.3193, startLng: 114.1694, endLat: 24.8607, endLng: 67.0011, arcAlt: 0.4, color: colors[0] }, // Pakistan (Karachi)
  
    // Europe
    { order: 14, startLat: 22.3193, startLng: 114.1694, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.6, color: colors[1] }, // UK (London)
    { order: 15, startLat: 22.3193, startLng: 114.1694, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.6, color: colors[2] }, // France (Paris)
    { order: 16, startLat: 22.3193, startLng: 114.1694, endLat: 52.52, endLng: 13.405, arcAlt: 0.6, color: colors[0] }, // Germany (Berlin)
  
    // North America
    { order: 17, startLat: 22.3193, startLng: 114.1694, endLat: 40.7128, endLng: -74.0060, arcAlt: 0.8, color: colors[1] }, // USA (New York)
    { order: 18, startLat: 22.3193, startLng: 114.1694, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.9, color: colors[2] }, // USA (San Francisco)
    { order: 19, startLat: 22.3193, startLng: 114.1694, endLat: 43.6532, endLng: -79.3832, arcAlt: 0.8, color: colors[0] }, // Canada (Toronto)
  
    // South America
    { order: 20, startLat: 22.3193, startLng: 114.1694, endLat: -23.5505, endLng: -46.6333, arcAlt: 1.0, color: colors[1] }, // Brazil (São Paulo)
    { order: 21, startLat: 22.3193, startLng: 114.1694, endLat: -34.6037, endLng: -58.3816, arcAlt: 1.0, color: colors[2] }, // Argentina (Buenos Aires)
  
    // Africa
    { order: 22, startLat: 22.3193, startLng: 114.1694, endLat: -26.2041, endLng: 28.0473, arcAlt: 0.9, color: colors[0] }, // South Africa (Johannesburg)
    { order: 23, startLat: 22.3193, startLng: 114.1694, endLat: -1.2921, endLng: 36.8219, arcAlt: 0.9, color: colors[1] }, // Kenya (Nairobi)
    { order: 24, startLat: 22.3193, startLng: 114.1694, endLat: 30.0444, endLng: 31.2357, arcAlt: 0.8, color: colors[2] }, // Egypt (Cairo)
  
    // Oceania
    { order: 25, startLat: 22.3193, startLng: 114.1694, endLat: -33.8688, endLng: 151.2093, arcAlt: 1.0, color: colors[0] }, // Australia (Sydney)
    { order: 26, startLat: 22.3193, startLng: 114.1694, endLat: -36.8485, endLng: 174.7633, arcAlt: 1.0, color: colors[1] }, // New Zealand (Auckland)
  ];

  return (
    <div className="flex flex-row items-center justify-center pb-12 h-screen md:h-auto dark:bg-black bg-white relative w-full mb-20">
      <div className="max-w-7xl mx-auto w-full relative px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Left Column - Global Shipping Destinations */}
          <div className="lg:col-span-2 space-y-6 z-20 relative sm:ml-36">
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Global Shipping Destination</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-3">Specialised in South East Asia</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Brunei, Cambodia, Indonesia, Malaysia, the Philippines, Singapore, Thailand, and Vietnam.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-600 mb-3">Specialised in UAE</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Dubai, Saudi Arabia, Abu Dhabi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Globe (More Space) */}
          <div className="lg:col-span-3 relative overflow-hidden h-[35rem] mb-12">
            <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
            <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;