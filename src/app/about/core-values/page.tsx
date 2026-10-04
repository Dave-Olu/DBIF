import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Pending } from "@/components/Pending";
import { visionMission } from "@/data/site";

export const metadata: Metadata = {
  title: "Core Values",
  description: "The values that guide how DBIF operates.",
};

export default function CoreValuesPage() {
  return (
    <>
      <PageHeader title="Core Values" />
      <Container narrow className="py-16 sm:py-20">
        {visionMission.coreValues.length > 0 ? (
          <div className="space-y-8">
            {visionMission.coreValues.map((value) => (
              <div key={value.title} className="border-l-2 border-gold pl-5">
                <h2 className="font-display text-xl font-medium text-ink">{value.title}</h2>
                <p className="mt-2 text-ink/70">{value.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <Pending label="Official core values" />
        )}
      </Container>
    </>
  );
}
