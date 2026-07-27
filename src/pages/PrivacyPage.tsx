import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Nav, Footer } from "./HomePage";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — Global Book Fairs";
  }, []);

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <Nav />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to exhibitions
        </Link>

        <h1 className="mt-6 font-display text-3xl text-navy sm:text-4xl">Privacy Policy</h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-charcoal/80">
          <section>
            <h2 className="font-display text-lg text-navy">1. Introduction</h2>
            <p className="mt-2">
              Global Book Fairs ("we," "our," or "us") respects your privacy and is committed to
              protecting the personal information you share with us. This Privacy Policy explains what
              information we collect, how we use it, and the choices you have regarding your
              information when using our website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">2. Information We Collect</h2>
            <p className="mt-2">We may collect the following types of information:</p>

            <h3 className="mt-4 font-semibold text-charcoal">Personal Information</h3>
            <p className="mt-1">When you contact us or submit an application, we may collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or organization name</li>
              <li>Country</li>
              <li>Professional information</li>
              <li>Any information you voluntarily provide</li>
            </ul>

            <h3 className="mt-4 font-semibold text-charcoal">Technical Information</h3>
            <p className="mt-1">When you visit our website, we may automatically collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Date and time of access</li>
              <li>Referral website</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">3. How We Use Your Information</h2>
            <p className="mt-2">We use your information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide and improve our services.</li>
              <li>Process registration requests.</li>
              <li>Respond to inquiries and support requests.</li>
              <li>Send important updates regarding exhibitions or services.</li>
              <li>Improve website performance and user experience.</li>
              <li>Detect fraud and maintain website security.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">4. Cookies</h2>
            <p className="mt-2">Our website may use cookies and similar technologies to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Remember user preferences.</li>
              <li>Analyze website traffic.</li>
              <li>Improve website performance.</li>
              <li>Enhance your browsing experience.</li>
            </ul>
            <p className="mt-2">
              You can disable cookies through your browser settings, although some features of the
              website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">5. Sharing Your Information</h2>
            <p className="mt-2">We do not sell, rent, or trade your personal information.</p>
            <p className="mt-2">We may share information only when necessary with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Exhibition organizers (when you submit an application)</li>
              <li>Trusted service providers assisting in website operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners during mergers or acquisitions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">6. Data Security</h2>
            <p className="mt-2">
              We implement reasonable administrative, technical, and organizational measures to
              protect your personal information against unauthorized access, disclosure, alteration,
              or destruction.
            </p>
            <p className="mt-2">
              However, no internet transmission or electronic storage method is completely secure, and
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">7. Third-Party Websites</h2>
            <p className="mt-2">
              Our website may contain links to external websites, including official exhibition
              websites.
            </p>
            <p className="mt-2">
              We are not responsible for the privacy practices, content, or security of third-party
              websites. We encourage you to review their privacy policies before providing personal
              information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">8. Data Retention</h2>
            <p className="mt-2">We retain your personal information only for as long as necessary to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide our services.</li>
              <li>Process applications.</li>
              <li>Comply with legal obligations.</li>
              <li>Resolve disputes.</li>
              <li>Enforce our agreements.</li>
            </ul>
            <p className="mt-2">
              When information is no longer required, it is securely deleted or anonymized where
              appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">9. Your Rights</h2>
            <p className="mt-2">Depending on your local laws, you may have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access your personal information.</li>
              <li>Correct inaccurate information.</li>
              <li>Request deletion of your information.</li>
              <li>Restrict or object to processing.</li>
              <li>Withdraw consent where applicable.</li>
              <li>Request a copy of your data.</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">10. Children's Privacy</h2>
            <p className="mt-2">
              Global Book Fairs is not intended for children under the age of 13 (or the minimum age
              required by applicable law).
            </p>
            <p className="mt-2">
              We do not knowingly collect personal information from children. If we become aware that
              such information has been collected, we will promptly remove it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">11. International Data Transfers</h2>
            <p className="mt-2">
              Because our services are available worldwide, your information may be processed or
              stored in countries outside your own. We take reasonable steps to ensure that your
              information receives an appropriate level of protection consistent with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">12. Changes to This Privacy Policy</h2>
            <p className="mt-2">We may update this Privacy Policy from time to time.</p>
            <p className="mt-2">
              Any changes will be posted on this page along with the updated revision date. Continued
              use of our website after changes are posted constitutes acceptance of the revised
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">13. Contact Us</h2>
            <p className="mt-2">
              If you have any questions regarding this Privacy Policy or how we handle your personal
              information, please contact us through the contact information available on the Contact
              Us page of the Global Book Fairs website.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}