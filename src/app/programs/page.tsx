import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "DBIF's programs and ministries for children, youths, singles, couples, and leaders.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Programs & Ministries"
        intro="DBIF serves people at different stages of life — here's where you might fit in."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map((program) => (
            <div key={program.slug} className="border border-ink/12 p-6">
              <h2 className="font-display text-xl font-medium text-ink">{program.title}</h2>
              <p className="mt-1 text-sm text-gold-dark">For {program.audience.toLowerCase()}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{program.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
