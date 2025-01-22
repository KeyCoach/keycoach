type Variant = "px" | "sm" | "md";

export function Divider({
  variant = "px",
}: Readonly<{
  children: React.ReactNode;
  variant?: Variant;
}>) {
  const variantClasses = {
    px: "h-px",
    sm: "h-0.5",
    md: "h-1",

  };
  return <div className={`${variantClasses[variant]} bg-slate-400 w-100 rounded-md`}></div>;
}
