import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { GiveForm } from "@/components/GiveForm";
import { givingEnabled } from "@/lib/paystack";
import { givingPurposes } from "@/data/site";

export const metadata: Metadata = { title: "Give", description: "Give or support the work of DBIF online." };
export const dynamic = "force-dynamic";

export default function GivePage() {
  return (
    <>
      <PageHeader title="Give / Support" intro="Your gift helps DBIF build people and communities." />
      <Container narrow className="py-16 sm:py-20">
        {givingEnabled() ? (
          <GiveForm purposes={givingPurposes} />
        ) : (
          <p className="text-lg leading-relaxed text-ink/70">
            Online giving is not open yet. Please check back soon, or reach us through the Contact page.
          </p>
        )}
      </Container>
    </>
  );
}
