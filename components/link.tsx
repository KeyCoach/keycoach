import NextLink from "next/link";

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
  const variantClasses = {
    breadcrumb: "text-obsidian-800 dark:text-slate-300 hover:underline",
    normal: "text-slate-900 dark:text-slate-100 hover:underline",
    "navbar-link": "text-slate-900 dark:text-slate-100 text-white hover:underline",
    "navbar-link-home": "text-2xl text-slate-900 dark:text-slate-100 text-white hover:underline",
  };

  const dynamicClass = `${variantClasses[linkVariant]} ${className || ""}`;

  return (
    <NextLink href={href} onClick={onClick} className={dynamicClass}>
      {children}
    </NextLink>
  );
}
