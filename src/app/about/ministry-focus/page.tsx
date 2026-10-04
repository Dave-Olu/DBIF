import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { MinistryPillars } from "@/components/MinistryPillars";

export const metadata: Metadata = {
  title: "Ministry Focus",
  description: "DBIF's three primary areas of focus: Leadership, Relationship, and Finance.",
};

export default function MinistryFocusPage() {
  return (
    <>
      <PageHeader
        title="Ministry Focus"
        intro="Pursued within a broader Christian foundation of salvation, holiness, spiritual growth, deliverance, and making heaven."
      />
      <Container className="py-16 sm:py-20">
        <MinistryPillars />
      </Container>
    </>
  );
}
