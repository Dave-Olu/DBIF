import type { FieldDef } from "@/lib/admin-schema";

const base = "w-full border border-ink/20 bg-paper px-3 py-2 text-ink outline-none focus-visible:border-gold";

export function FieldInput({ field, value, idPrefix }: { field: FieldDef; value: unknown; idPrefix: string }) {
  const id = `${idPrefix}-${field.name}`;
  const text = Array.isArray(value) ? value.join(", ") : typeof value === "string" ? value : "";

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm text-ink/80">
        <input type="checkbox" name={field.name} defaultChecked={value === true} className="h-4 w-4" />
        {field.label}
      </label>
    );
  }
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-ink/70">
        {field.label}{field.required && <span className="text-red-700"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea id={id} name={field.name} rows={3} required={field.required} defaultValue={text} className={base} />
      ) : (
        <input
          id={id} name={field.name} required={field.required} defaultValue={text}
          type={field.type === "date" ? "date" : "text"} className={base}
        />
      )}
      {field.hint && <p className="mt-1 text-xs text-ink/50">{field.hint}</p>}
    </div>
  );
}
