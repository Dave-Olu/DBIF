import { requireRole } from "@/lib/auth";
import { listDonations } from "@/lib/ledger";
import { formatNaira } from "@/lib/utils";

export default async function DonationsAdmin() {
  await requireRole("super");
  const all = [...(await listDonations())].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const ok = all.filter((d) => d.status === "success");
  const total = ok.reduce((n, d) => n + d.amountKobo, 0);
  const th = "px-3 py-2 text-left font-medium";
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-3xl font-medium text-ink">Donations</h1>
        <a href="/api/admin/donations" className="rounded-sm bg-ink px-5 py-2 text-sm font-medium text-paper hover:bg-ink-light">Download CSV</a>
      </div>
      <p className="mt-3 text-ink/70">
        Confirmed: <strong className="font-medium text-ink">{formatNaira(total)}</strong> from {ok.length} gift{ok.length === 1 ? "" : "s"}.
        Only payments confirmed with Paystack are counted.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border border-ink/12 text-sm">
          <thead className="bg-paper-dim"><tr><th className={th}>Date</th><th className={th}>Name</th><th className={th}>Purpose</th><th className={th}>Amount</th><th className={th}>Status</th></tr></thead>
          <tbody>
            {all.map((d) => (
              <tr key={d.reference} className="border-t border-ink/10">
                <td className="px-3 py-2">{(d.paidAt ?? d.createdAt).slice(0, 10)}</td>
                <td className="px-3 py-2">{d.name ?? "Anonymous"}<div className="text-xs text-ink/50">{d.email}</div></td>
                <td className="px-3 py-2">{d.purpose}</td>
                <td className="px-3 py-2">{formatNaira(d.amountKobo)}</td>
                <td className="px-3 py-2 capitalize">{d.status}{d.note && <div className="text-xs text-ink/50">{d.note}</div>}</td>
              </tr>
            ))}
            {all.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-ink/60">No donations yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
