import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Pending } from "@/components/Pending";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { leadershipProfiles } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description: "DBIF's founder and leadership team.",
};

export default function LeadershipPage() {
  const hasConfirmedProfiles = leadershipProfiles.some((p) => p.name);

  return (
    <>
      <PageHeader title="Leadership" intro="The people leading DBIF's mission forward." />
      <Container className="py-16 sm:py-20">
        {hasConfirmedProfiles ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipProfiles.map((profile, i) => (
              <div key={i} className="border border-ink/12 p-6">
                {profile.photoUrl ? (
                  <div className="relative aspect-square overflow-hidden rounded">
                    <ImageWithFallback
                      src={profile.photoUrl}
                      alt={profile.name ?? "Leadership profile photo"}
                      fill
                      fallbackText={profile.name?.slice(0, 2).toUpperCase() || "DBIF"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded bg-paper-dim text-3xl font-display font-medium text-ink/70">
                    {profile.name?.charAt(0)?.toUpperCase() ?? "DB"}
                  </div>
                )}
                <h2 className="mt-4 font-display text-xl font-medium text-ink">{profile.name}</h2>
                <p className="text-sm text-ink/60">{profile.title}</p>
                {profile.bio && <p className="mt-3 text-sm leading-relaxed text-ink/70">{profile.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <Pending label="Founder and leadership names, titles, photographs, and biographies" />
        )}
      </Container>
    </>
  );
}
