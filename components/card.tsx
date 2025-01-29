"use client";
import { Button } from "@/components/button";
import { Badge } from "@/components/badges";

interface CardProps {
  title: string;
  subtitle: string;
  badgeIcon: string;
  badgeTheme?: "obsidian" | "cerulean" | "red" | "amber" | "green";
  buttonText: string;
  onButtonClick?: () => void;
}

export function Card({
  title,
  subtitle,
  badgeIcon,
  badgeTheme = "green",
  buttonText,
  onButtonClick,
}: CardProps) {
  return (
    <div className="w-full max-w-xs border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="p-3 bg-white-100">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center justify-between p-4 bg-slate-100">
        <Badge icon={badgeIcon} colorTheme={badgeTheme} />
        <Button colorTheme="cerulean" onClick={onButtonClick}>
          <span>{buttonText}</span>{" "}
        </Button>
      </div>
      {/*Just an idea?
      <div className="w-full bg-gray-100 rounded-full">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: "70%" }} />
      </div>*/}
    </div>
  );
}
