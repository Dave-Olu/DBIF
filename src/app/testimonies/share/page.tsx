import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { TestimonyForm } from "@/components/TestimonyForm";

export const metadata: Metadata = {
  title: "Share Your Testimony",
  description: "Share how your life has been shaped through DBIF.",
};

export default function ShareTestimonyPage() {
  return (
    <>
      <PageHeader
        title="Share your testimony"
        intro="Tell us how your life has been shaped through DBIF. Your story will be reviewed and will not be published without your separate permission."
      />
      <Container narrow className="py-16 sm:py-20">
        <TestimonyForm />
      </Container>
    </>
  );
}