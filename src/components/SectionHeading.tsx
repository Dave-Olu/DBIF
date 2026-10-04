import { Keystone } from "@/components/Keystone";
import { cx } from "@/lib/utils";

export function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "ink",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "paper";
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className={cx("flex items-center gap-2", align === "center" && "justify-center")}>
        <Keystone tone={tone === "paper" ? "gold" : "gold"} />
      </div>
      <h2
        className={cx(
          "mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl",
          tone === "paper" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cx("mt-3 text-[1.05rem] leading-relaxed", tone === "paper" ? "text-paper/80" : "text-ink/70")}>
          {intro}
        </p>
      )}
    </div>
  );
}
