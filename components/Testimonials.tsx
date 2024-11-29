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
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      title: "Seamless and Reliable Service!",
      testimonialText:
        "I’ve been using this service for months, and it has completely changed how I shop online. The shipping process is smooth, and my packages always arrive on time. Highly recommended for anyone buying from China!",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      title: "Affordable and Hassle-Free!",
      testimonialText:
        "I love how easy it is to order products from China now. Their rates are affordable, and the team handles everything, from shipping to delivery, so I don’t have to worry about anything.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      title: "Superb Customer Support!",
      testimonialText:
        "Their team is so helpful and responsive. They kept me updated every step of the way, and my items were delivered straight to my door in perfect condition.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      title: "A Game-Changer for My Business!",
      testimonialText:
        "As a small business owner, I rely on this service to source products from China. The consolidation option saves me a ton on shipping, and the delivery is always fast and reliable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      title: "Safe and Secure Shipping!",
      testimonialText:
        "I was hesitant at first to order from overseas, but this service exceeded my expectations. My items were well-packed and arrived without a scratch. I’ll definitely use them again!",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
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
                className="my-2 md:basis-1/2 lg:basis-1/3"
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
