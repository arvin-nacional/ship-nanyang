import CTA from '@/components/CTA';
import React from 'react';

const Page = () => {
  return (
    <div className="max-sm:pt-20 bg-white mt-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Effective Date: July 11, 2024</p>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-lg">
              At <span className="font-semibold">SD Express</span>,
              we are committed to protecting your privacy and ensuring that your personal data is handled responsibly and securely.
            </p>
          </div>

          {/* Section 1 */}
          <section className=" p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect the following types of information when you interact with our website or services:</p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="font-medium text-lg">Personal Information</h3>
                <p className="text-gray-700">Your name, contact number, email address, delivery address, and other relevant details you provide when using our booking or contact forms.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Usage Data</h3>
                <p className="text-gray-700">Information about your device and how you use our website, such as your IP address, browser type, pages visited, and time spent on the site.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Cookies</h3>
                <p className="text-gray-700">We use cookies and similar technologies to improve your browsing experience, analyze traffic, and personalize content.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected data to:</p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Process and manage bookings and deliveries</li>
              <li>Improve our services and customer experience</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send updates about your bookings or promotions (if you opt-in)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className=" p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Sharing of Information</h2>
            <p className="mb-4">We do not sell your personal data. We may share your information only in the following situations:</p>
            
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="font-medium text-lg">With Service Providers</h3>
                <p className="text-gray-700">Such as logistics partners, IT providers, or payment processors who help us deliver our services.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">When Legally Required</h3>
                <p className="text-gray-700">To comply with applicable laws, regulations, or valid legal processes.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Business Transfers</h3>
                <p className="text-gray-700">In the event of a merger, acquisition, or sale of assets, your data may be part of the transferred assets.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Your Rights</h2>
            <p className="mb-4">As a user, you have the right to:</p>
            
            <ul className="list-disc ml-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Opt-out of receiving marketing communications</li>
            </ul>
            
            <p className="mt-4">
              To exercise any of these rights, please contact us at <a href="mailto:support@sdexpress.ph" className="text-primary hover:underline">support@sdexpress.ph</a>.
            </p>
          </section>

          {/* Sections 5-9 */}
          <section className=" p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your data from unauthorized access, disclosure, or misuse. 
              However, no online system is completely secure.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites.
            </p>
          </section>

          <section className=" p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700">
              SD Express does not knowingly collect personal data from individuals under the age of 13. 
              If we learn we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy to reflect changes to our practices or for legal reasons. 
              Any updates will be posted on this page with the updated date.
            </p>
          </section>

          {/* Contact Section */}
          <section className=" p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Contact Us</h2>
            <p className="mb-4">For any questions or concerns about this Privacy Policy, please contact:</p>
            
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">SD Express</p>
              <p>Email: <a href="mailto:inquiries@sdexpress.ph" className="text-primary hover:underline">support@sdexpress.ph</a></p>
              <p>Website: <a href="https://sdexpress.ph" className="text-primary hover:underline">https://sdexpress.ph</a></p>
            </div>
          </section>
        </div>
      </div>
      <CTA/>
    </div>
  );
};

export default Page;