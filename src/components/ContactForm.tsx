"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "submitted") {
    return (
      <div className="border border-forest/30 bg-forest/5 p-6">
        <p className="font-display text-lg text-forest">Thank you — your message has been received.</p>
        <p className="mt-2 text-sm text-ink/60">Someone from DBIF will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="reason" className="mb-1.5 block text-sm text-ink/70">What is this about?</label>
        <select id="reason" name="reason" className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold">
          <option>General enquiry</option>
          <option>Prayer / support request</option>
          <option>Event information</option>
          <option>Partnership enquiry</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink/70">Message</label>
        <textarea id="message" name="message" rows={5} required maxLength={3000} className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold" />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center rounded-sm bg-ink px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-light disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-ink/70">{label}</label>
      <input id={name} name={name} type={type} required={required} maxLength={200} className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold" />
    </div>
  );
}
