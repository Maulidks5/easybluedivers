import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  /** Use on dark photo backgrounds. */
  onDark?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]";

const light = "border-border bg-background text-foreground hover:bg-muted";
const dark =
  "border-navy-foreground/40 bg-navy-foreground/10 text-navy-foreground backdrop-blur-sm hover:bg-navy-foreground/20";

export const secondaryButtonClass = `${base} ${light}`;
export const secondaryButtonOnDarkClass = `${base} ${dark}`;

export function SecondaryButton({
  children,
  className,
  fullWidth,
  onDark,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, onDark ? dark : light, fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryLink({
  children,
  className,
  fullWidth,
  onDark,
  ...props
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(base, onDark ? dark : light, fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </a>
  );
}
