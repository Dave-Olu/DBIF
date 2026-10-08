export function PreviewNotice({
  title = "Preview content",
  message = "Sample or illustrative content is shown for site preview only. Final DBIF content is still pending leadership confirmation.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mb-8 rounded-sm border border-gold/40 bg-gold/5 px-4 py-3 text-sm leading-relaxed text-ink/75">
      <span className="font-semibold text-ink">{title}:</span> {message}
    </div>
  );
}
