import type { GalleryImage } from "@/lib/types";
import { Keystone } from "@/components/Keystone";
import { cx } from "@/lib/utils";

const toneByCategory: Record<GalleryImage["category"], string> = {
  worship: "bg-ink",
  outreach: "bg-forest",
  conference: "bg-gold-dark",
  community: "bg-ink-light",
};

/**
 * Real photography is supplied by DBIF (PRD §15). Until then, each tile is
 * a textured placeholder labelled with its caption, so the grid, captions,
 * and admin workflow can be reviewed before real media is wired in.
 */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <figure key={image.id} className="group relative aspect-square overflow-hidden rounded-sm">
          <div
            className={cx(
              "flex h-full w-full items-center justify-center bg-grain",
              toneByCategory[image.category]
            )}
          >
            <Keystone tone="paper" className="h-6 w-8 opacity-40" />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-2 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100">
            {image.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
