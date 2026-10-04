import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DBIF.",
};

export default async function ContactPage() {
  const { contact } = await getSettings();
  const contactRows: [string, string | null][] = [
    ["Phone", contact.phone],
    ["WhatsApp", contact.whatsapp],
    ["Email", contact.email],
    ["Address", contact.address],
  ];
  return (
    <>
      <PageHeader title="Contact Us" intro="Questions, prayer requests, or just want to say hello — reach out." />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-xl font-medium text-ink">Reach us directly</h2>
          <dl className="mt-5 space-y-4">
            {contactRows.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-ink/50">{label}</dt>
                <dd className="mt-0.5 text-ink/80">{value ?? "To be confirmed"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-ink/60">
            Prayer and support requests submitted here are handled according to DBIF
            leadership&apos;s approved process.
          </p>
        </div>
        <ContactForm />
      </Container>
    </>
  );
}
