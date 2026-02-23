import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="flex items-center justify-center bg-dark-300 px-16 py-12 max-md:px-6">
      <div className="w-full max-w-[1200px]">
        {/* Top row */}
        <div className="grid gap-10 [grid-template-columns:2fr_1fr_2fr_2fr] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/icons/new-logo-english-half.png"
              width={100}
              height={50}
              alt="logo"
            />
            <p className="text-sm text-slate-400 leading-relaxed">
              Forget the hassle of international shipping—order from China with
              ease, and we&apos;ll handle the rest.
            </p>
            <div className="flex gap-4 mt-1">
              <a href="https://www.facebook.com/profile.php?id=61580578587759" target="_blank">
                <Image src="/assets/icons/facebook.svg" width={20} height={20} alt="Facebook" className="bg-[#1877F2] rounded-full" />
              </a>
              <a href="https://www.instagram.com/shipnanyang/" target="_blank">
                <Image src="/assets/icons/instagram.svg" width={20} height={20} alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <p className="text-white font-semibold mb-2">Quick Links</p>
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</Link>
            <Link href="/locations" className="text-sm text-slate-400 hover:text-white transition-colors">Locations</Link>
            <Link href="/request-quote" className="text-sm text-slate-400 hover:text-white transition-colors">Request Quote</Link>
            <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          {/* Head Office */} 
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold mb-2">Contact</p>
            <div className="flex gap-3 items-center">
              <Image src="/assets/icons/telephone-call.png" width={16} height={16} alt="phone" className="shrink-0" />
              <p className="text-sm text-slate-400">+852 6091 1394</p>
            </div>
            <div className="flex gap-3 items-center">
              <Image src="/assets/icons/paper-plane.png" width={16} height={16} alt="email" className="shrink-0" />
              <p className="text-sm text-slate-400">info@shipnanyang.com</p>
            </div>
            <div className="flex gap-3 items-start">
              <Image src="/assets/icons/pin.png" width={16} height={16} alt="pin" className="shrink-0 mt-0.5" />
             
              <p className="text-sm text-slate-400 leading-relaxed">
                 <span className="text-white text-xs font-medium">Hong Kong Head Office</span><br />
                RX Nanyang Ltd<br />
                Room 1601, 16/F Workington Tower<br />
                78 Bonham Strand, Sheung Wan, <br/>Hong Kong
              </p>
            </div>
          </div>

          {/* Branches */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold mb-2">Branches</p>
            <div className="flex gap-3 items-start">
              <Image src="/assets/icons/pin.png" width={16} height={16} alt="pin" className="shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-white text-xs font-medium">Philippines, Manila</span><br />
                26th & 27th Floors The Podium<br />
                Ortigas Center, Mandaluyong<br />
                +63 966 401 6784
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <Image src="/assets/icons/pin.png" width={16} height={16} alt="pin" className="shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-white text-xs font-medium">Malaysia, Kuala Lumpur</span><br />
                Suite 9-08, 9th Floor<br />
                Wisma Warisan, 33 Jalan Yap Ah Shak<br />
                50300 Kuala Lumpur
              </p>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} RX Nanyang Ltd. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

