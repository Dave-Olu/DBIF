"use client";

import { useState } from "react";

export function AnnouncementBar({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!message) return null;

  return (
    <aside className={`overflow-hidden bg-ink text-paper transition-[max-height,opacity] duration-300 ${visible ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`} aria-label="Announcement">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-sm sm:px-6 lg:px-8">
        <span className="shrink-0 text-xs font-semibold uppercase text-gold">Announcement</span>
        <div className="min-w-0 flex-1 overflow-hidden text-left" aria-live="polite">
          <span className="sr-only">{message}</span>
          <div className="announcement-track" aria-hidden="true">
            <span className="announcement-copy">{message}</span>
            <span className="announcement-copy">{message}</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-paper/75 transition-colors hover:bg-paper/10 hover:text-paper"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}