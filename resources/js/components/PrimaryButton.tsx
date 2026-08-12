import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-coral-foreground shadow-sm transition-all hover:brightness-110 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-60";

const base = primaryButtonClass;

export function PrimaryButton({
  children,
  className,
  fullWidth,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, fullWidth && "w-full", className)} {...props}>
      {children}
    </button>
  );
}

export function PrimaryLink({
  children,
  className,
  fullWidth,
  ...props
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, fullWidth && "w-full", className)} {...props}>
      {children}
    </a>
  );
}
