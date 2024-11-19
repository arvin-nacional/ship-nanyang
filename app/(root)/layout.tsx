import Footer from "@/components/Footer";
import MessengerBtn from "@/components/shared/MessengerBtn";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

// import CustomCursor from "@/components/shared/CustomCursor";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light900_dark200 relative">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto  ">
        <div className="mx-auto w-full ">{children}</div>
      </section>
      <MessengerBtn />
      <Toaster />
      <Footer />
    </main>
  );
};

export default Layout;
