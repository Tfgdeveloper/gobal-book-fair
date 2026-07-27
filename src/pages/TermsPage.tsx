import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Nav, Footer } from "./HomePage";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms and Conditions — Global Book Fairs";
  }, []);

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <Nav />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to exhibitions
        </Link>

        <h1 className="mt-6 font-display text-3xl text-navy sm:text-4xl">Terms and Conditions</h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-charcoal/80">
          <section>
            <h2 className="font-display text-lg text-navy">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using Global Book Fairs ("the Website"), you agree to comply with and be
              bound by these Terms and Conditions. If you do not agree with any part of these terms,
              you should discontinue using the Website immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">2. About Global Book Fairs</h2>
            <p className="mt-2">
              Global Book Fairs is an online platform that provides information about international
              book fairs, publishing exhibitions, literary festivals, and related industry events. The
              Website also allows authors, publishers, literary agents, and exhibitors to discover
              events and submit registration requests for participation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">3. Use of the Website</h2>
            <p className="mt-2">You agree to use the Website only for lawful purposes. You must not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Submit false or misleading information.</li>
              <li>Attempt to gain unauthorized access to the Website.</li>
              <li>Interfere with the Website's security or functionality.</li>
              <li>Copy or redistribute Website content without permission.</li>
              <li>Use automated tools to scrape or collect data without authorization.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">4. Event Information</h2>
            <p className="mt-2">
              We strive to keep event information accurate and up to date. However, dates, venues,
              schedules, participation fees, and organizer requirements may change without prior
              notice.
            </p>
            <p className="mt-2">
              Users should always verify important information directly with the official event
              organizer before making travel, accommodation, or business decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">5. Registration Requests</h2>
            <p className="mt-2">
              Submitting an application through Global Book Fairs does not guarantee acceptance into
              any event.
            </p>
            <p className="mt-2">
              Final approval, exhibitor selection, booth allocation, and participation decisions are
              solely determined by the respective event organizers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">6. Third-Party Websites</h2>
            <p className="mt-2">
              Our Website may contain links to official event websites and other third-party
              resources.
            </p>
            <p className="mt-2">
              Global Book Fairs is not responsible for the content, availability, security, or privacy
              practices of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">7. Intellectual Property</h2>
            <p className="mt-2">
              All content on this Website, including text, graphics, branding, logos, icons, and
              design elements, is the property of Global Book Fairs or its licensors unless otherwise
              stated.
            </p>
            <p className="mt-2">
              You may not reproduce, distribute, or modify any content without prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">8. Disclaimer</h2>
            <p className="mt-2">
              The Website is provided on an "as is" and "as available" basis.
            </p>
            <p className="mt-2">
              While we make reasonable efforts to maintain accurate information, we do not guarantee
              that the Website will always be error-free, uninterrupted, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">9. Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by applicable law, Global Book Fairs shall not be liable
              for any direct, indirect, incidental, consequential, or special damages resulting from:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use of the Website.</li>
              <li>Reliance on event information.</li>
              <li>Registration outcomes.</li>
              <li>Third-party websites or services.</li>
              <li>Technical interruptions or data loss.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">10. Privacy</h2>
            <p className="mt-2">
              Your use of the Website is also governed by our{" "}
              <Link to="/privacy" className="text-navy underline hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              , which explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">11. Changes to These Terms</h2>
            <p className="mt-2">
              We reserve the right to modify these Terms and Conditions at any time.
            </p>
            <p className="mt-2">
              Any updates become effective immediately upon publication on this page. Continued use of
              the Website constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">12. Termination</h2>
            <p className="mt-2">
              We reserve the right to suspend or terminate access to the Website for users who violate
              these Terms or engage in activities that may harm the Website or its users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">13. Governing Law</h2>
            <p className="mt-2">
              These Terms and Conditions shall be governed by and interpreted in accordance with the
              applicable laws of the jurisdiction in which Global Book Fairs operates, unless
              otherwise required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg text-navy">14. Contact Us</h2>
            <p className="mt-2">
              If you have any questions regarding these Terms and Conditions, please contact us
              through the contact information provided on the Website.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}