const OPTS = { timeZone: "UTC" } as const;

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", ...OPTS });
}

export function formatDateShort(iso: string): { day: string; month: string } {
  const date = new Date(`${iso}T00:00:00Z`);
  return {
    day: date.toLocaleDateString("en-GB", { day: "numeric", ...OPTS }),
    month: date.toLocaleDateString("en-GB", { month: "short", ...OPTS }).toUpperCase(),
  };
}

/** Today's date in Nigeria as YYYY-MM-DD, so "upcoming" doesn't shift with server time zone. */
export function todayInLagos(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(kobo / 100);
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
