import { ministryFocusAreas } from "@/data/ministry-focus";

/**
 * DBIF's three focus areas presented literally as three pillars carrying
 * one beam — a structural device that matches what the content actually
 * is (three co-equal areas supporting one mandate), rather than a numbered
 * 01/02/03 list, which would imply a sequence that isn't there.
 */
export function MinistryPillars() {
  return (
    <div className="border-t-4 border-gold">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {ministryFocusAreas.map((area) => (
          <div key={area.slug} className="relative pt-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-8 w-1 bg-gold sm:left-1/2 sm:-translate-x-1/2"
            />
            <h3 className="font-display text-xl font-medium text-ink">{area.title}</h3>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/70">{area.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
