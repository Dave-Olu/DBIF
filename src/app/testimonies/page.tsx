import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { TestimonyCard } from "@/components/TestimonyCard";
import { testimonies } from "@/data/testimonies";

export const metadata: Metadata = {
  title: "Testimonies",
  description: "Stories from people whose lives have been shaped through DBIF.",
};

export default function TestimoniesPage() {
  return (
    <>
      <PageHeader
        title="Testimonies"
        intro="Published with consent. Some are shared anonymously by request."
      />
      <Container narrow className="py-16 sm:py-20">
        <div className="space-y-10">
          {testimonies.map((testimony) => (
            <TestimonyCard key={testimony.id} testimony={testimony} />
          ))}
        </div>
        <div className="mt-12 border-t border-ink/15 pt-8">
          <h2 className="font-display text-xl font-medium text-ink">Have a story to share?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Share how your life has been shaped through DBIF.
          </p>
          <Button href="/testimonies/share" className="mt-5">
            Share your testimony
          </Button>
        </div>
      </Container>
    </>
  );
}
