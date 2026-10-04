import { cx } from "@/lib/utils";

/**
 * A small trapezoid — the shape of a keystone, the block that holds an
 * arch together. Used as the site's one recurring graphic device instead
 * of a generic eyebrow label, tying back to "Destiny Builders" without
 * spelling it out.
 */
export function Keystone({ className, tone = "gold" }: { className?: string; tone?: "gold" | "paper" | "ink" }) {
  const fill = {
    gold: "fill-gold",
    paper: "fill-paper",
    ink: "fill-ink",
  }[tone];

  return (
    <svg
      viewBox="0 0 24 18"
      aria-hidden="true"
      className={cx("h-3 w-4", className)}
    >
      <path d="M6 0H18L24 18H0L6 0Z" className={fill} />
    </svg>
  );
}
