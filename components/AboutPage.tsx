import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Clock, Users, Award, Globe, HeartHandshake } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      {/* <section className="flex items-center justify-center bg-gray-100 px-16 pt-32 pb-20 max-md:px-5 max-sm:py-5 sm:px-14">
        <div className="grid w-[1200px] max-w-full grid-cols-2 gap-10 px-2 pb-6 align-top max-md:mt-10 max-sm:grid-cols-1">
          <div className="flex flex-col items-start justify-center">
            <h2 className="h1-bold mb-2 text-dark-500">
              At SD Express, we bridge the gap between the vast marketplace of
              <span className="text-primary-500"> China</span> and your
              <span className="text-primary-500"> home in the Philippines</span>.
            </h2>
            <p className="paragraph-regular mt-5 ">
              Our mission is to simplify international shopping, making it
              accessible, affordable, and hassle-free for everyone. We understand
              the challenges of buying products from overseas—complicated shipping
              processes, hidden fees, and the uncertainty of when your items will
              arrive. That&apos;s why we&apos;ve created a streamlined service to
              take the stress out of international logistics. From providing you
              with a unique shipping address in China to delivering your purchases
              straight to your doorstep, we handle every step with care and
              precision.
            </p>
            <Link href="/signup">
              <Button className="mt-10 rounded-3xl bg-primary-500 px-10 text-light-900">
                Start Now
              </Button>
            </Link>
          </div>
          <Image
            alt="about-image"
            src="/assets/images/about-1.png"
            width={552}
            height={552}
          />
        </div>
      </section> */}

      {/* Core Values & Principles Section */}
      <section className="py-20 bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h1-bold mb-4 text-dark-500">Core Values & Principles</h2>
            <p className="paragraph-regular text-dark-400 max-w-2xl mx-auto">
              The fundamental beliefs that guide our operations and define our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Shield className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Reliability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We build trust through consistent, dependable service. Every shipment is handled with the utmost care, 
                  ensuring your packages arrive safely and on schedule, every single time.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Clock className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Efficiency</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Time is valuable. Our streamlined processes and advanced logistics network ensure fast, 
                  cost-effective delivery without compromising on quality or security.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Users className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Customer First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your success is our priority. We provide personalized support, transparent communication, 
                  and tailored solutions to meet your unique shipping needs.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Award className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Excellence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We continuously strive for perfection in every aspect of our service, from packaging 
                  to delivery, maintaining the highest standards in the industry.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Globe className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Global Reach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our extensive network spans continents, connecting businesses and individuals across 
                  borders with seamless, reliable shipping solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-background/50 backdrop-blur border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <HeartHandshake className="h-8 w-8 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-primary-500">Integrity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Honesty and transparency guide every interaction. We build lasting relationships through 
                  ethical practices and clear, upfront communication.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <p className="text-muted-foreground">Delivery Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5-7</div>
                <p className="text-muted-foreground">Business Days Delivery</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Secure Packaging</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
