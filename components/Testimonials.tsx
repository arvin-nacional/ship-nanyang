import React from "react";
import TestimonialCard from "./ui/testimonial-card";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const testimonialData = [
    {
      testimonialThumb: "/assets/images/testimonial-4.svg",
      title: "A Game-Changer for My Business!",
      testimonialText:
        "SD Express has made importing products seamless for my business. Their efficient shipping and excellent support allow me to focus on scaling, knowing my deliveries are in good hands.",
      avatarName: "Clara S.",
      avatarDesignation: "Online Store Owner",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-1.svg",

      testimonialText:
        "Since we started shipping with SDExpress on 2022, we are very satisfied with their fast and reliable reliable. There are some challenges with some of my products coming in the PH, but they really helped us with all the requirements in the clearing process and logistics.  SDExpress is perfect fit for our fast paced operations.",
      avatarName: "DARIV",
      avatarDesignation: "DARIV Concrete Polishing",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-2.svg",
      title: "My Secret to Success!",
      testimonialText:
        "I’ve been using SD Express for months, and they never disappoint! Their reliable delivery service has helped me keep my customers happy and my inventory stocked effortlessly.",
      avatarName: "Jenny L.",
      avatarDesignation: "Importer",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-3.svg",
      title: "Safe and Secure Shipping!",
      testimonialText:
        "I was hesitant at first to order from overseas, but this service exceeded my expectations. My items were well-packed and arrived without a scratch. I’ll definitely use them again!",
      avatarName: "Kevin T.",
      avatarDesignation: "Online Store Owner",
      ratings: "5",
    },

    {
      testimonialThumb: "/assets/images/testimonial-5.svg",
      title: "Helping My Business Thrive!",
      testimonialText:
        "Thanks to SD Express, I’ve expanded my product line and improved customer satisfaction. They handle the shipping while I focus on growing my brand. Highly recommend!",
      avatarName: "Katherine P.",
      avatarDesignation: "Beauty Products Seller",
      ratings: "5",
    },
  ];

  return (
    <section className="background-light400_dark300 flex items-center justify-center overflow-hidden px-16 pb-20 pt-0 max-md:p-10">
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10 lg:mt-14">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="flex-between mb-12 flex items-end">
            <div>
              <p className="h1-bold ">Testimonials</p>
            </div>
            <div className="flex items-end justify-end">
              <div className="mt-12 flex flex-row justify-end gap-5 max-sm:pt-10">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent>
            {testimonialData.map((item, index) => (
              <CarouselItem
                key={index}
                className="my-2 md:basis-1/2 lg:basis-1/3 "
              >
                <div>
                  <Card>
                    <TestimonialCard
                      image={item.testimonialThumb}
                      name={item.avatarName}
                      designation={item.avatarDesignation}
                      rating={item.ratings}
                      text={item.testimonialText}
                      title={item.title}
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
