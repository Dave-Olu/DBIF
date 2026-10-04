import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { collections } from "@/lib/admin-schema";
import { listItems, type CollectionName } from "@/lib/content";
import { saveItemAction, deleteItemAction } from "../actions";
import { FieldInput } from "@/components/admin/FieldInput";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export default async function CollectionPage({
  params, searchParams,
}: { params: { collection: string }; searchParams: { saved?: string; error?: string } }) {
  await requireRole("editor");
  if (!(params.collection in collections)) notFound();
  const name = params.collection as CollectionName;
  const def = collections[name];
  const items = await listItems(name);
  const btn = "rounded-sm bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-ink-light";

  const form = (item: Record<string, unknown> | null) => (
    <form action={saveItemAction} className="space-y-4">
      <input type="hidden" name="collection" value={name} />
      {item && <input type="hidden" name="slug" value={String(item.slug)} />}
      {def.fields.map((f) => (
        <FieldInput key={f.name} field={f} value={item?.[f.name]} idPrefix={item ? String(item.slug) : "new"} />
      ))}
      <button type="submit" className={btn}>{item ? "Save changes" : `Add ${def.singular}`}</button>
    </form>
  );

  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">{def.label}</h1>
      {searchParams.saved && <p role="status" className="mt-4 border border-forest/30 bg-forest/5 px-4 py-2 text-sm text-forest">Saved. The public site is updated.</p>}
      {searchParams.error && <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">{searchParams.error}</p>}

      <details className="mt-6 border border-ink/15 bg-paper p-5">
        <summary className="cursor-pointer font-medium text-ink">Add a new {def.singular}</summary>
        <div className="mt-5">{form(null)}</div>
      </details>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.slug} className="border border-ink/12 bg-paper p-5">
            <details>
              <summary className="cursor-pointer text-ink">
                <span className="font-medium">{String(item[def.titleField])}</span>
                {typeof item.date === "string" && <span className="ml-3 text-sm text-ink/50">{item.date}</span>}
              </summary>
              <div className="mt-5">{form(item)}</div>
              <form action={deleteItemAction} className="mt-4 border-t border-ink/10 pt-4">
                <input type="hidden" name="collection" value={name} />
                <input type="hidden" name="slug" value={item.slug} />
                <ConfirmButton message={`Delete this ${def.singular}? This cannot be undone.`}>Delete this {def.singular}</ConfirmButton>
              </form>
            </details>
          </li>
        ))}
        {items.length === 0 && <li className="text-ink/60">Nothing here yet.</li>}
      </ul>
    </>
  );
}
