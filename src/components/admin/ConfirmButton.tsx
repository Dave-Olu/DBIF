"use client";

export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}
      className="text-sm text-red-700 underline underline-offset-2 hover:text-red-900"
    >
      {children}
    </button>
  );
}
