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
      "bg-obsidian-500 text-slate-100 hover:bg-obsidian-300 disabled:bg-obsidian-100 focus:bg-obsidian-200",
    cerulean:
      "bg-cerulean-500 text-slate-100 hover:bg-cerulean-300 disabled:bg-cerulean-100 focus:bg-cerulean-200",
    red: "bg-red-500 text-slate-100 hover:bg-red-300 disabled:bg-red-100 focus:bg-red-200",
    amber:
      "bg-amber-500 text-slate-100 hover:bg-amber-300 disabled:bg-amber-100 focus:bg-amber-200",
    green:
      "bg-green-500 text-slate-100 hover:bg-green-300 disabled:bg-green-100 focus:bg-green-200",
    ceruleanLight:
      "bg-cerulean-400 text-slate-100 hover:bg-cerulean-300 disabled:bg-cerulean-100 focus:bg-cerulean-150",
  };

  let dynamicClass = className ? className : colorClasses[colorTheme];
  dynamicClass += ` ${variantClasses[variant]} px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-button-shadow min-w-button-min-width`;

  dynamicClass = dynamicClass.concat(
    ` ${variantClasses[variant]} px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-button-shadow min-w-button-min-width`,
  );

  // TODO: replace the children with a spinner
  if (loading) {
    dynamicClass += " bg-gray-300 cursor-wait";
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
          className="inline-block"
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
