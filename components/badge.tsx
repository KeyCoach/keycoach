import { Icon } from "@/components";

interface BadgeProps {
  className?: string;
  icon: string;
  colorTheme?: "obsidian" | "cerulean" | "red" | "amber" | "green";
  label?: string; // Add a prop for the text label
}

export function Badge({ className, icon, colorTheme = "cerulean", label }: BadgeProps) {
  const colorClasses = {
    obsidian: "bg-obsidian-500 text-slate-100",
    cerulean: "bg-cerulean-500 text-slate-100",
    red: "bg-red-500 text-slate-100",
    amber: "bg-amber-500 text-slate-100",
    green: "bg-green-500 text-slate-100",
  };

  const dynamicClass = `${colorClasses[colorTheme]} ${className} flex items-center gap-2 px-3 py-1 rounded shadow-md`;

  return (
    <div className={dynamicClass}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <Icon src={`../icons/${icon}.svg`} alt={`${icon} icon`} w={18} h={18} />
    </div>
  );
}
