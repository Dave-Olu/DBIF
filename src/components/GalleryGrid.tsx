import type { GalleryImage } from "@/lib/types";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <figure key={image.id} className="overflow-hidden rounded-sm border border-ink/10 bg-paper">
          <div className="relative aspect-[4/3]">
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              fill
              fallbackText="DBIF"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <figcaption className="px-3 py-3 text-sm font-medium text-ink">
            {image.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
