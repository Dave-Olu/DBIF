import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { mentionedPartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Churches and Christian organizations DBIF relates and partners with.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        title="Partnerships"
        intro="DBIF relates to a number of churches, fellowships, and Christian organizations. This list reflects the nature of each relationship and does not imply formal endorsement where none exists."
      />
      <Container narrow className="py-16 sm:py-20">
        <ul className="divide-y divide-ink/10">
          {mentionedPartners.map((partner) => (
            <li key={partner.name} className="flex items-center justify-between py-4">
              <span className="font-display text-lg text-ink">{partner.name}</span>
              <span className="text-sm text-ink/50">{partner.relationship}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink/50">
          Final list and relationship descriptions pending review and approval by DBIF leadership
          (PRD §16).
        </p>
      </Container>
    </>
  );
}
