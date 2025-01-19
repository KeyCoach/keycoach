type Variant = "centered" | "previous-nav" | "next-nav" | "icon";

export function Button({
  variant = "centered",
  className,
  children,
}: Readonly<{
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}>) {
  const buttonVariants = {
    centered: "grid place-items-center",
    "previous-nav": "flex row-reverse",
    "next-nav": "flex",
    icon: "grid place-items-center",
  };

  let dynamicClass = className ? className : "bg-cerulean-500 text-white hover:bg-cerulean-700";
  dynamicClass = dynamicClass.concat(
    ` ${buttonVariants[variant]} px-4 py-2 rounded-md transition-colors duration-200`
  );

  return <button className={dynamicClass}>{children}</button>;
}
