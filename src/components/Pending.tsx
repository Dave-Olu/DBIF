/**
 * Renders a clearly-marked placeholder for content that PRD §22/§24
 * identifies as pending confirmation from DBIF leadership, instead of
 * showing invented text. Swap the data source once the real value exists —
 * this component only needs to stop being called.
 */
export function Pending({ label }: { label: string }) {
  return (
    <div className="rounded-sm border border-dashed border-slate-light/70 bg-paper-dim/60 px-4 py-3 text-sm text-ink/60">
      <span className="font-medium text-ink/70">Pending: </span>
      {label} — awaiting confirmation from DBIF leadership.
    </div>
  );
}
