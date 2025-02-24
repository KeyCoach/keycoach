"use client";
import { Icon } from "@/components";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "default"
  | "previous-nav"
  | "next-nav"
  | "icon";
type ColorTheme = "obsidian" | "cerulean" | "ceruleanLight" | "red" | "amber" | "green";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  colorTheme?: ColorTheme;
  darkMode?: boolean;
  loading?: boolean;
};

export function Button({
  children,
  className = "",
  variant = "default",
  colorTheme = "cerulean",
  loading,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-700 text-white",
    default: "grid place-items-center",
    "previous-nav": "flex items-center flex-row-reverse gap-1",
    "next-nav": "flex items-center gap-1",
    icon: "grid place-items-center",
  };

  const colorClasses = {
    obsidian:
      "bg-obsidian-400 dark:bg-obsidian-500 text-slate-100 hover:bg-obsidian-300 dark:hover:bg-obsidian-600 disabled:bg-obsidian-100 dark:disabled:bg-obsidian-800 focus:bg-obsidian-200 dark:focus:bg-obsidian-500",
    cerulean:
      "bg-cerulean-400 dark:bg-cerulean-500 text-slate-100 hover:bg-cerulean-300 dark:hover:bg-cerulean-600 disabled:bg-cerulean-100 dark:disabled:bg-cerulean-800 focus:bg-cerulean-200 dark:focus:bg-cerulean-500",
    red: 
      "bg-red-400 dark:bg-red-500 text-slate-100 hover:bg-red-300 dark:hover:bg-red-600 disabled:bg-red-100 dark:disabled:bg-red-800 focus:bg-red-200 dark:focus:bg-red-500",
    amber:
      "bg-amber-400 dark:bg-amber-600 text-slate-100 hover:bg-amber-300 dark:hover:bg-amber-600 disabled:bg-amber-100 dark:disabled:bg-amber-800 focus:bg-amber-200 dark:focus:bg-amber-500",
    green:
      "bg-green-400 dark:bg-green-600 text-slate-100 hover:bg-green-300 dark:hover:bg-green-600 disabled:bg-green-100 dark:disabled:bg-green-800 focus:bg-green-200 dark:focus:bg-green-500",
    ceruleanLight:
      "bg-cerulean-400 dark:bg-cerulean-400 text-slate-100 hover:bg-cerulean-300 dark:hover:bg-cerulean-500 disabled:bg-cerulean-100 dark:disabled:bg-cerulean-700 focus:bg-cerulean-150 dark:focus:bg-cerulean-400",
  };

  let dynamicClass = className ? className : colorClasses[colorTheme];
  dynamicClass += ` ${variantClasses[variant]} px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-button-shadow min-w-button-min-width`;

  dynamicClass = dynamicClass.concat(
    ` ${variantClasses[variant]} px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-button-shadow min-w-button-min-width`,
  );

  // TODO: replace the children with a spinner
  if (loading) {
    dynamicClass += " bg-gray-300 dark:bg-gray-700 cursor-wait";
    children = <span>Loading...</span>; // Replace with actual spinner if needed
  }

  if (variant.includes("nav")) {
    const navIconName = variant.includes("previous") ? "chevron-left" : "chevron-right";
    children = (
      <>
        {children}
        <Icon
          src={`/icons/${navIconName}.svg`}
          alt={`${navIconName} icon`}
          w={18}
          h={18}
          className="inline-block dark:invert"
        />
      </>
    );
  }

  return (
    <button className={dynamicClass} {...props} disabled={loading || props.disabled}>
      {children}
    </button>
  );
}
