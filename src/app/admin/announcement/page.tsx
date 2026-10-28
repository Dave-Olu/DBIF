import { requireRole } from "@/lib/auth";
import { getAnnouncement } from "@/lib/content";
import { saveAnnouncementAction } from "../actions";

const input = "w-full border border-ink/20 bg-paper px-3 py-2 text-ink outline-none focus-visible:border-gold";

export default async function AnnouncementAdmin({
  searchParams,
}: {
  searchParams: { saved?: string; error?: string };
}) {
  await requireRole("editor");
  const announcement = await getAnnouncement();
  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">Announcement</h1>
      <p className="mt-2 text-ink/60">Change or clear the message shown in the public announcement bar.</p>
      {searchParams.saved && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Saved. The public site is updated.</p>}
      {searchParams.error && <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">{searchParams.error}</p>}
      <form action={saveAnnouncementAction} className="mt-6 max-w-xl space-y-4">
        <div>
          <label htmlFor="announcement" className="mb-1 block text-sm text-ink/70">Announcement message</label>
          <textarea
            id="announcement"
            name="announcement"
            rows={4}
            maxLength={300}
            defaultValue={announcement}
            className={input}
          />
          <p className="mt-1 text-xs text-ink/50">Up to 300 characters. Leave empty to hide the announcement bar.</p>
        </div>
        <button type="submit" className="rounded-sm bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-ink-light">Save announcement</button>
      </form>
    </>
  );
}
