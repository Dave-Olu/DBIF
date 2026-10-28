import Image from "next/image";
import { requireRole } from "@/lib/auth";
import { getGalleryImages } from "@/lib/content";
import { deleteGalleryImageAction, saveGalleryImageAction } from "../actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

const input = "w-full border border-ink/20 bg-paper px-3 py-2 text-ink outline-none focus-visible:border-gold";

export default async function GalleryAdmin({
  searchParams,
}: {
  searchParams: { saved?: string; uploaded?: string; updated?: string; error?: string };
}) {
  await requireRole("editor");
  const images = await getGalleryImages();
  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">Gallery</h1>
      <p className="mt-2 text-ink/60">Upload images to add them to the public gallery. JPEG, PNG, or WebP; maximum 5 MB per image.</p>
      {searchParams.saved && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Image removed from the public gallery.</p>}
      {searchParams.uploaded && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Image uploaded and published.</p>}
      {searchParams.updated && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Image details updated.</p>}
      {searchParams.error && <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">{searchParams.error}</p>}

      <form action="/api/admin/gallery-upload" method="post" encType="multipart/form-data" className="mt-6 max-w-xl space-y-4 border border-ink/12 bg-paper p-5">
        <div>
          <label htmlFor="image" className="mb-1 block text-sm text-ink/70">Image file *</label>
          <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required className={input} />
        </div>
        <div>
          <label htmlFor="alt" className="mb-1 block text-sm text-ink/70">Caption / image description *</label>
          <input id="alt" name="alt" required maxLength={150} className={input} />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-sm text-ink/70">Category *</label>
          <select id="category" name="category" required defaultValue="community" className={input}>
            <option value="worship">Worship</option>
            <option value="outreach">Outreach</option>
            <option value="conference">Conference</option>
            <option value="community">Community</option>
          </select>
        </div>
        <button type="submit" className="rounded-sm bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-ink-light">Upload and publish</button>
      </form>

      <h2 className="mt-10 font-display text-xl font-medium text-ink">Published images</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <li key={image.id} className="border border-ink/12 bg-paper p-4">
            <Image src={image.src} alt={image.alt} width={400} height={300} className="aspect-[4/3] w-full object-cover" />
            <form action={saveGalleryImageAction} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={image.id} />
              <div>
                <label htmlFor={`alt-${image.id}`} className="mb-1 block text-sm text-ink/70">Caption / image description</label>
                <input id={`alt-${image.id}`} name="alt" required maxLength={150} defaultValue={image.alt} className={input} />
              </div>
              <div>
                <label htmlFor={`category-${image.id}`} className="mb-1 block text-sm text-ink/70">Category</label>
                <select id={`category-${image.id}`} name="category" required defaultValue={image.category} className={input}>
                  <option value="worship">Worship</option>
                  <option value="outreach">Outreach</option>
                  <option value="conference">Conference</option>
                  <option value="community">Community</option>
                </select>
              </div>
              <button type="submit" className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light">Save details</button>
            </form>
            <form action={deleteGalleryImageAction} className="mt-3 border-t border-ink/10 pt-3">
              <input type="hidden" name="id" value={image.id} />
              <ConfirmButton message="Remove this image from the public gallery?">Remove image</ConfirmButton>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
