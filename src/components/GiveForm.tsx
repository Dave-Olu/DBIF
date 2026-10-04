"use client";

import { useState, type FormEvent } from "react";

const input = "w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold";

export function GiveForm({ purposes }: { purposes: string[] }) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/give/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), email: fd.get("email"), amount: Number(fd.get("amount")), purpose: fd.get("purpose") ?? purposes[0],
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      window.location.href = json.url; // Paystack hosted checkout
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-ink/70">Full name (optional)</label>
          <input id="name" name="name" maxLength={100} className={input} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink/70">Email (for your receipt)</label>
          <input id="email" name="email" type="email" required className={input} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className="mb-1.5 block text-sm text-ink/70">Amount (₦)</label>
          <input id="amount" name="amount" type="number" inputMode="decimal" min={100} step="any" required className={input} />
        </div>
        {purposes.length > 1 && (
          <div>
            <label htmlFor="purpose" className="mb-1.5 block text-sm text-ink/70">Purpose</label>
            <select id="purpose" name="purpose" className={input}>
              {purposes.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        )}
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center rounded-sm bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-light disabled:opacity-60"
      >
        {busy ? "Redirecting to Paystack…" : "Give securely with Paystack"}
      </button>
      <p className="text-xs text-ink/50">
        Payment is handled by Paystack. This website never sees or stores your card details.
      </p>
    </form>
  );
}
