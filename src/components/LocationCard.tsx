import type { Location } from "@/lib/types";

export function LocationCard({ location }: { location: Location }) {
  return (
    <div className="border border-ink/12 bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-medium text-ink">{location.name}</h3>
        <span className="whitespace-nowrap rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
          {location.type === "physical" ? "Physical branch" : "Online community"}
        </span>
      </div>
      {location.state && <p className="mt-1 text-sm text-ink/60">{location.state}</p>}
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        {location.type === "online-community"
          ? "Connect with DBIF through our online community."
          : location.address ?? location.meetingInfo}
      </p>
      {location.contact && <p className="mt-2 text-sm text-ink/60">{location.contact}</p>}
      {location.type === "online-community" && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://chat.whatsapp.com/IetGly6mf6v1JK2th0SrxZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm bg-forest px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-forest-dark"
          >
            Join on WhatsApp
          </a>
          <a
            href="https://t.me/dbif5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-forest/30 px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest/10"
          >
            Join on Telegram
          </a>
        </div>
      )}
      {location.mapEmbedUrl && (
        <iframe
          src={location.mapEmbedUrl}
          title={`Map of ${location.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-4 h-44 w-full border-0"
        />
      )}
    </div>
  );
}
