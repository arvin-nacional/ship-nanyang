import RequestQuoteForm from "@/components/forms/RequestQuoteForm";
import React from "react";

const RequestQuotePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light-850 px-5 py-20 pt-32">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="h1-bold mb-4 text-dark-500">Request a Quote</h1>
          <p className="paragraph-regular text-dark-400 max-w-2xl mx-auto">
            Get a personalized shipping quote for your cargo. Fill out the form below with your requirements, 
            and our team will provide you with a detailed quotation within 24 hours.
          </p>
        </div>
        
        <div className="rounded-3xl bg-white p-8 shadow-lg max-sm:p-5">
          <RequestQuoteForm />
        </div>
      </div>
    </div>
  );
};

export default RequestQuotePage;
