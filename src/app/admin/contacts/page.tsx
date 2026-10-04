import { requireRole } from "@/lib/auth";
import { getSettings } from "@/lib/content";
import { saveSettingsAction } from "../actions";

const input = "w-full border border-ink/20 bg-paper px-3 py-2 text-ink outline-none focus-visible:border-gold";

export default async function ContactsAdmin({ searchParams }: { searchParams: { saved?: string; error?: string } }) {
  await requireRole("editor");
  const { contact, social } = await getSettings();
  const rows: [string, string, string | null][] = [
    ["phone", "Phone", contact.phone], ["whatsapp", "WhatsApp", contact.whatsapp], ["email", "Email", contact.email],
    ["address", "Address / headquarters", contact.address],
    ["facebook", "Facebook link", social.facebook], ["instagram", "Instagram link", social.instagram],
    ["youtube", "YouTube link", social.youtube], ["tiktok", "TikTok link", social.tiktok], ["x", "X link", social.x],
  ];
  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">Contact details</h1>
      {searchParams.saved && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Saved. The public site is updated.</p>}
      {searchParams.error && <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">{searchParams.error}</p>}
      <form action={saveSettingsAction} className="mt-6 max-w-xl space-y-4">
        {rows.map(([name, label, value]) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1 block text-sm text-ink/70">{label}</label>
            <input id={name} name={name} defaultValue={value ?? ""} className={input} />
          </div>
        ))}
        <p className="text-xs text-ink/50">Social links must start with https://. Leave a field empty to hide it.</p>
        <button type="submit" className="rounded-sm bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-ink-light">Save</button>
      </form>
    </>
  );
}
