import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  const { day, month } = formatDateShort(event.date);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex overflow-hidden rounded-sm border border-ink/12 bg-paper transition-shadow hover:shadow-md hover:shadow-ink/5"
    >
      <div className="flex w-20 flex-none flex-col items-center justify-center bg-ink text-paper">
        <span className="font-display text-2xl font-medium leading-none">{day}</span>
        <span className="mt-1 text-xs tracking-wide">{month}</span>
      </div>
      <div className="flex-1 border-l border-dashed border-ink/20 px-5 py-4">
        <h3 className="font-display text-lg font-medium text-ink group-hover:underline">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          {event.time} · {event.venue}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{event.description}</p>
      </div>
    </Link>
  );
}
