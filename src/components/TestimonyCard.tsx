import type { Testimony } from "@/lib/types";

export function TestimonyCard({ testimony }: { testimony: Testimony }) {
  return (
    <figure className="border-l-2 border-gold py-1 pl-5">
      <blockquote className="font-display text-lg leading-snug text-ink">
        “{testimony.summary}”
      </blockquote>
      <figcaption className="mt-3 text-sm text-ink/55">
        {testimony.name ?? "Shared anonymously"}
        {testimony.location ? ` · ${testimony.location}` : ""}
      </figcaption>
    </figure>
  );
}
