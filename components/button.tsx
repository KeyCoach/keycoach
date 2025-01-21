import { Icon } from "@/components/icon";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: "default" | "previous-nav" | "next-nav" | "icon";
  colorTheme?: "obsidian" | "cerulean" | "red" | "amber" | "green";
  darkMode?: boolean;
}

export function Button({
  className,
  children,
  loading,
  variant = "default",
  colorTheme = "cerulean",
}: ButtonProps) {
  const variantClasses = {
    default: "grid place-items-center",
    "previous-nav": "flex items-center flex-row-reverse gap-2",
    "next-nav": "flex items-center row gap-2",
    icon: "grid place-items-center",
  };

  const colorClasses = {
    obsidian:
      "bg-obsidian-500 text-slate-100 hover:bg-obsidian-300 disabled:bg-obsidian-100 focus:bg-obsidian-200",
    cerulean:
      "bg-cerulean-500 text-slate-100 hover:bg-cerulean-300 disabled:bg-cerulean-100 focus:bg-cerulean-200",
    red: "bg-red-500 text-slate-100 hover:bg-red-300 disabled:bg-red-100 focus:bg-red-200",
    amber: "bg-amber-500 text-slate-100 hover:bg-amber-300 disabled:bg-amber-100 focus:bg-amber-200",
    green: "bg-green-500 text-slate-100 hover:bg-green-300 disabled:bg-green-100 focus:bg-green-200",
  };

  let dynamicClass = className ? className : colorClasses[colorTheme];

  dynamicClass = dynamicClass.concat(
    ` ${variantClasses[variant]} px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-button-shadow min-w-button-min-width`
  );

  // TODO: replace the children with a spinner
  if (loading) {
    dynamicClass = dynamicClass.concat(" bg-gray-300 cursor-wait");
  }

  if (variant.includes("nav")) {
    const navIconName = variant.includes("previous") ? "chevron-left" : "chevron-right";
    children = (
      <>
        {children}
        <Icon
          src="icons/button-vertical-divider.svg"
          alt="chevron left icon"
          w={"1rem"}
          h={"1rem"}
        />
        <Icon src={`icons/${navIconName}.svg`} alt="chevron right icon" w={"1rem"} h={"1rem"} />
      </>
    );
  }

  return <button className={dynamicClass}>{children}</button>;
}
