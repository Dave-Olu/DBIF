import Link from "next/link";
import type { Sermon } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function SermonListItem({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      href={`/sermons/${sermon.slug}`}
      className="group flex items-start gap-4 border-b border-ink/10 py-5 first:pt-0"
    >
      <span
        aria-hidden="true"
        className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold text-gold-dark"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
          <path d="M6 4L20 12L6 20V4Z" />
        </svg>
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-medium text-ink group-hover:underline">
            {sermon.title}
          </h3>
          {sermon.date && <span className="text-sm text-ink/50">{formatDate(sermon.date)}</span>}
        </div>
        <p className="mt-1 text-sm text-ink/60">
          {sermon.speaker} · {sermon.category}
          {sermon.scripture ? ` · ${sermon.scripture}` : ""}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{sermon.description}</p>
      </div>
    </Link>
  );
}
