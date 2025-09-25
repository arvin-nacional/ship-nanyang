import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface RequestQuoteSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  showImage?: boolean;
  variant?: "default" | "compact" | "hero";
  className?: string;
}

const RequestQuoteSection = ({
  title = "Need a Custom Quote?",
  subtitle = "Get Your Personalized Shipping Quote Today",
  description = "Tell us about your cargo and shipping requirements. Our experts will provide you with a detailed quote tailored to your specific needs.",
  buttonText = "Request Quote",
  showImage = true,
  variant = "default",
  className = "",
}: RequestQuoteSectionProps) => {
  if (variant === "compact") {
    return (
      <section className={`bg-primary-500 py-16 ${className}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-5 text-center">
          <h3 className="h2-bold mb-4 text-white">{subtitle}</h3>
          <p className="paragraph-regular mb-8 max-w-2xl text-light-400">
            {description}
          </p>
          <Link href="/request-quote">
            <Button className="rounded-3xl bg-white px-10 py-3 text-primary-500 hover:bg-light-800">
              {buttonText}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  if (variant === "hero") {
    return (
      <section className={`bg-gradient-to-r from-primary-500 to-primary-400 py-20 ${className}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-5 text-center">
          <h2 className="h1-bold mb-6 text-white">{subtitle}</h2>
          <p className="paragraph-regular mb-10 max-w-3xl text-light-300">
            {description}
          </p>
          <div className="flex gap-4 max-sm:flex-col">
            <Link href="/request-quote">
              <Button className="rounded-3xl bg-white px-12 py-4 text-primary-500 hover:bg-light-800">
                {buttonText}
              </Button>
            </Link>
            <Link href="/shipping-calculator">
              <Button 
                variant="outline" 
                className="rounded-3xl border-white px-12 py-4 text-white hover:bg-white hover:text-primary-500"
              >
                Calculate Shipping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <main className={`flex flex-col items-center justify-center overflow-hidden py-14 max-md:py-0 max-md:pt-14 ${className}`}>
      <section className="w-[1200px] max-w-full overflow-hidden rounded-3xl bg-white shadow-lg max-sm:rounded-none">
        <div className="flex gap-5 rounded-xl max-md:flex-col">
          <article className="flex w-[41%] flex-col max-md:ml-4 max-md:w-full">
            <div className="flex h-full w-full flex-col items-start justify-center gap-5 ml-20 max-md:mt-10 max-md:max-w-full max-sm:ml-5">
              <h4 className="base-medium text-primary-500">{title}</h4>
              <h5 className="h1-bold drop-shadow-lg max-lg:h2-semibold max-lg:drop-shadow-none">
                {subtitle}
              </h5>
              {/* <p className="paragraph-regular text-dark-400 mb-2">
                {description}
              </p> */}
              <Link href="/request-quote">
                <Button className="rounded-3xl bg-primary-500 px-10 text-light-900 hover:bg-primary-400">
                  {buttonText}
                </Button>
              </Link>
            </div>
          </article>
          {showImage && (
            <figure className="flex w-[59%] flex-col max-md:ml-0 max-md:w-full max-sm:w-[100%]">
              <Image
                loading="lazy"
                src="/assets/images/cta-img.png"
                alt="Request shipping quote illustration"
                className="aspect-[2.2] w-full grow object-fill max-md:mt-5 max-md:max-w-full max-md:object-cover max-sm:aspect-[1.5]"
                height={300}
                width={754}
              />
            </figure>
          )}
        </div>
      </section>
    </main>
  );
};

export default RequestQuoteSection;
