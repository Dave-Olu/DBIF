"use client";

import { useState, type FormEvent } from "react";

export function TestimonyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          reason: "Testimony submission",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      setStatus("submitted");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "submitted") {
    return (
      <div className="border border-forest/30 bg-forest/5 p-6" role="status">
        <p className="font-display text-lg text-forest">Thank you for sharing your testimony.</p>
        <p className="mt-2 text-sm text-ink/60">
          The DBIF team will review it. Your story will not be published without your separate permission.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="testimony-name" className="mb-1.5 block text-sm text-ink/70">Your name</label>
          <input id="testimony-name" name="name" required maxLength={100} className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold" />
        </div>
        <div>
          <label htmlFor="testimony-email" className="mb-1.5 block text-sm text-ink/70">Email address</label>
          <input id="testimony-email" name="email" type="email" required maxLength={200} className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold" />
        </div>
      </div>

      <div>
        <label htmlFor="testimony-message" className="mb-1.5 block text-sm text-ink/70">Your testimony</label>
        <textarea id="testimony-message" name="message" rows={8} required minLength={3} maxLength={3000} className="w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink outline-none focus-visible:border-gold" />
        <p className="mt-1 text-xs text-ink/50">Please keep your testimony under 3,000 characters.</p>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
        <input name="contactConsent" type="checkbox" required className="mt-1 accent-forest" />
        <span>DBIF may contact me about my testimony. I understand it will not be published without my separate permission.</span>
      </label>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center rounded-sm bg-forest px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-forest-dark disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send testimony"}
      </button>
    </form>
  );
}