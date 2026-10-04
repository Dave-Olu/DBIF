import Link from "next/link";
import { cx } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const styles = {
    primary: "bg-gold text-ink hover:bg-gold-light",
    secondary: "bg-paper text-ink hover:bg-paper-dim",
    ghost: "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10",
  }[variant];

  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition-colors",
        styles,
        className
      )}
    >
      {children}
    </Link>
  );
}
