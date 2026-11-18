import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { formatDate, formatDateRange, formatDateShort } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export function EventCard({ event }: { event: EventItem }) {
  const { day, month } = formatDateShort(event.date);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group grid overflow-hidden rounded-sm border border-ink/12 bg-paper transition-shadow hover:shadow-lg hover:shadow-ink/10 sm:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
    >
      <div className={`relative flex min-h-64 items-center justify-center overflow-hidden bg-ink ${event.posterUrl ? "" : "text-paper"}`}>
        {event.posterUrl ? (
          <ImageWithFallback
            src={event.posterUrl}
            alt={`Poster for ${event.title}`}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-contain"
          />
        ) : (
          <>
            <div aria-hidden="true" className="absolute -right-12 -top-14 h-52 w-52 rounded-full border border-gold/30" />
            <div aria-hidden="true" className="absolute -right-5 -top-7 h-40 w-40 rounded-full border border-paper/15" />
            <div className="relative flex flex-col items-center py-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{month}</span>
              <span className="mt-1 font-display text-6xl font-medium leading-none">{day}</span>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-paper/70">Save the date</span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center border-t border-dashed border-ink/20 p-5 sm:border-l sm:border-t-0 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
          {event.endDate && event.endDate !== event.date
            ? formatDateRange(event.date, event.endDate)
            : formatDate(event.date)}
        </p>
        <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink group-hover:underline sm:text-2xl">
          {event.title}
        </h3>
        <p className="mt-3 text-sm font-medium text-ink/75">{event.time}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/60">{event.venue}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70">{event.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          Event details <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
