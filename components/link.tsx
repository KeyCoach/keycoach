"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Variant = "breadcrumb" | "normal" | "navbar-link" | "navbar-link-home";

export function Link({
  href,
  children,
  onClick,
  className,
  linkVariant = "normal",
}: Readonly<{
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  linkVariant?: Variant;
}>) {
  const pathName = usePathname();
  const variantClasses = {
    breadcrumb: "text-obsidian-800 dark:text-slate-300 no-underline hover:underline ",
    normal:
      "text-slate-900 dark:text-slate-100 no-underline hover:underline decoration-slate-900 dark:decoration-slate-100",
    "navbar-link": "text-slate-900 dark:text-slate-100 no-underline hover:underline",
    "navbar-link-home": "text-2xl text-slate-900 dark:text-slate-100 no-underline hover:underline",
  };

  let dynamicClass = `${variantClasses[linkVariant]} ${className || ""}`;

  if (pathName === "/") {
    dynamicClass = dynamicClass.replace(
      "text-slate-900 dark:text-slate-100",
      "text-slate-100 dark:text-slate-100",
    );
  }

  return (
    <NextLink href={href} onClick={onClick} className={dynamicClass}>
      {children}
    </NextLink>
  );
}
