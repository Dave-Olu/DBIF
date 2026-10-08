import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Destiny Builders' Int'l Fellowship collects, uses, and safeguards your information.",
};

export default async function PrivacyPage() {
  const { contact } = await getSettings();

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        intro="Destiny Builders' Int'l Fellowship is committed to protecting your privacy. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website."
      />
      <Container narrow className="space-y-10 py-16 sm:py-20">
        <p className="text-sm text-ink/60">
          <strong className="font-medium text-ink">Effective date:</strong> October 4, 2026
        </p>

        <p className="leading-relaxed text-ink/70">
          Please read this Privacy Policy carefully. If you do not agree with its terms, please do
          not access the site.
        </p>

        <section aria-labelledby="information-we-collect">
          <h2 id="information-we-collect" className="font-display text-2xl font-medium text-ink">
            1. Information We Collect
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We may collect information about you in a variety of ways, including:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-ink/70">
            <li>
              <strong className="font-medium text-ink">Personal data:</strong> Information such as
              your name, email address, phone number, and demographic information that you
              voluntarily provide when participating in fellowship activities, such as contact
              forms, prayer requests, newsletter subscriptions, or event registrations.
            </li>
            <li>
              <strong className="font-medium text-ink">Derivative data:</strong> Information our
              servers may automatically collect when you access the website, such as your IP
              address, browser type, operating system, access times, and the pages viewed directly
              before and after visiting the site.
            </li>
            <li>
              <strong className="font-medium text-ink">Financial data:</strong> Information related
              to a payment method when you tithe, give offerings, or donate through the website.
              Payments are handled by our payment processor, Paystack. This website does not see or
              store your card details; payment information is handled by the processor.
            </li>
          </ul>
        </section>

        <section aria-labelledby="how-we-use-information">
          <h2 id="how-we-use-information" className="font-display text-2xl font-medium text-ink">
            2. How We Use Your Information
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We use the information we collect to fulfill our ministry purposes, including to:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink/70">
            <li>Administer event registrations, memberships, or volunteer applications.</li>
            <li>Process donations, tithes, and offerings and issue receipts where applicable.</li>
            <li>Send ministry updates, newsletters, and information about upcoming events.</li>
            <li>Respond to your inquiries, prayer requests, and feedback.</li>
            <li>Maintain the security, safety, and operational integrity of our website.</li>
          </ul>
        </section>

        <section aria-labelledby="how-we-share-information">
          <h2 id="how-we-share-information" className="font-display text-2xl font-medium text-ink">
            3. How We Share Your Information
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We do not sell, rent, or trade your personal information to third parties. We may share
            your information only in these limited situations:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-ink/70">
            <li>
              <strong className="font-medium text-ink">Service providers:</strong> We may share
              information with trusted vendors who perform services for us, such as payment
              processing, email delivery, hosting, and database management. These parties are
              required to keep your information confidential.
            </li>
            <li>
              <strong className="font-medium text-ink">Legal requirements:</strong> We may disclose
              information when required by law, court order, or government regulation, or to
              protect the rights, property, and safety of the fellowship, our members, or others.
            </li>
          </ul>
        </section>

        <section aria-labelledby="security">
          <h2 id="security" className="font-display text-2xl font-medium text-ink">
            4. Security of Your Information
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We use administrative, technical, and physical security measures to help protect your
            personal information. While we take reasonable steps to secure information you provide,
            no security measure is perfect or impenetrable, and no method of data transmission can
            be guaranteed against interception or misuse.
          </p>
        </section>

        <section aria-labelledby="children">
          <h2 id="children" className="font-display text-2xl font-medium text-ink">
            5. Policy for Children
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We do not knowingly solicit information from or market to children under the age of 13.
            If you become aware of information we have collected from a child under 13, please
            contact us using the details below.
          </p>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights" className="font-display text-2xl font-medium text-ink">
            6. Your Privacy Rights
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            You may review or change your account information or end your relationship with us by
            contacting us directly. Depending on your location, you may also have the right to
            request a copy of your data or ask us to delete your personal information from our
            databases.
          </p>
        </section>

        <section aria-labelledby="policy-changes">
          <h2 id="policy-changes" className="font-display text-2xl font-medium text-ink">
            7. Changes to This Privacy Policy
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            We may update this Privacy Policy from time to time. We will post the updated policy on
            this page and advise you to review it periodically. Changes are effective when posted.
          </p>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact" className="font-display text-2xl font-medium text-ink">
            8. Contact Us
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            If you have questions about this Privacy Policy, please{" "}
            <Link href="/contact" className="text-forest underline underline-offset-4">
              contact us through our contact page
            </Link>
            {contact.email && (
              <>
                {" "}or email{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-forest underline underline-offset-4"
                >
                  {contact.email}
                </a>
              </>
            )}
            .
          </p>
        </section>
      </Container>
    </>
  );
}
