import React from "react";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            {/* <span className="inline-block px-4 py-1.5 bg-red-500/10 text-red-500 text-sm font-semibold rounded-full mb-4">
              Get In Touch
            </span> */}
            <h1 className="h1-bold mb-4 text-dark-500">
              Contact Us
            </h1>
            <p className="paragraph-regular text-dark-400">
              Have questions about our shipping services? We&apos;re here to help. 
              Reach out to us and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1 max-sm:pt-32">
              <h2 className="text-2xl font-bold text-dark-500 mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <a href="mailto:support@shipnanyang.com" className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors group">
                  <div className="p-3 bg-red-500/10 rounded-full group-hover:bg-red-500/20">
                    <Mail className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-500 mb-1">Email</h3>
                    <p className="text-dark-400 text-sm">support@shipnanyang.com</p>
                  </div>
                </a>

                <a href="tel:+639664016784" className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors group">
                  <div className="p-3 bg-red-500/10 rounded-full group-hover:bg-red-500/20">
                    <Phone className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-500 mb-1">Phone</h3>
                    <p className="text-dark-400 text-sm">+63 966 401 6784</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-500 mb-1">Address</h3>
                    <p className="text-dark-400 text-sm">
                      Ship Nanyang Headquarters<br />
                      Mandaluyong, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <Clock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-500 mb-1">Business Hours</h3>
                    <p className="text-dark-400 text-sm">
                      24/7 Customer Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Go High Level Form */}
            <div className="lg:col-span-2 my-[-30px] max-sm:my-[-120px] order-1 lg:order-2">
              <GoHighLevelForm 
                formUrl="https://api.leadconnectorhq.com/widget/form/mya74bPPqa8DpRI2KPfi"
                formId="mya74bPPqa8DpRI2KPfi"
                height="700px"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
