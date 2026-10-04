import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Pending } from "@/components/Pending";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DBIF handles your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <Container narrow className="py-16 sm:py-20">
        <p className="text-ink/70">
          This page will describe how DBIF collects, uses, and protects information submitted
          through this website (contact forms, event registration, and analytics), per PRD §14.
        </p>
        <div className="mt-6">
          <Pending label="Full privacy policy and cookie/analytics disclosures" />
        </div>
      </Container>
    </>
  );
}
