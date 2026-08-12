import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { primaryButtonClass } from "./PrimaryButton";
import { secondaryButtonClass, secondaryButtonOnDarkClass } from "./SecondaryButton";

type Variant = "primary" | "secondary" | "secondary-dark";

/**
 * Links to the quick booking form on the home page from anywhere in the site.
 */
export function BookNowLink({
  children,
  variant = "primary",
  className,
  fullWidth,
  course,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
  course?: string;
}) {
  const variantClass =
    variant === "primary"
      ? cn(primaryButtonClass, "rounded-xl px-4 py-2.5 text-[13px] font-bold")
      : variant === "secondary"
        ? secondaryButtonClass
        : secondaryButtonOnDarkClass;

  return (
    <a
      href={course ? `/?course=${encodeURIComponent(course)}#booking` : "/#booking"}
      className={cn(variantClass, fullWidth && "w-full", className)}
    >
      {children}
    </a>
  );
}
