import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { LocationCard } from "@/components/LocationCard";
import { getOnlineCommunities, getPhysicalLocations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find a DBIF branch near you, or connect with an online community.",
};

export default async function LocationsPage() {
  const physicalLocations = await getPhysicalLocations();
  const onlineLocations = await getOnlineCommunities();

  return (
    <>
      <PageHeader
        title="Locations"
        intro="DBIF has confirmed physical branches across Southwestern Nigeria and Kwara State, and online communities reaching further still. Only confirmed physical branches are listed as branches below."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="font-display text-2xl font-medium text-ink">Physical branches</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {physicalLocations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-medium text-ink">Online communities</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Connect with DBIF online and join our WhatsApp community.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {onlineLocations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </Container>
    </>
  );
}
