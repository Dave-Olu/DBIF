import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Pending } from "@/components/Pending";
import { visionMission } from "@/data/site";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "DBIF's vision and mission statements.",
};

export default function VisionMissionPage() {
  return (
    <>
      <PageHeader title="Vision & Mission" />
      <Container narrow className="py-16 sm:py-20">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Vision</h2>
            <div className="mt-3">
              {visionMission.vision ? (
                <p className="text-lg leading-relaxed text-ink/80">{visionMission.vision}</p>
              ) : (
                <Pending label="Official vision statement" />
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Mission</h2>
            <div className="mt-3">
              {visionMission.mission ? (
                <p className="text-lg leading-relaxed text-ink/80">{visionMission.mission}</p>
              ) : (
                <Pending label="Official mission statement" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
