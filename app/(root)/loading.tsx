import Footer from "@/components/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <main className="background-light900_dark200 relative">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto justify-center items-center">
        <LoadingSpinner />
      </section>
      <Footer />
    </main>
  );
};

export default Loading;
