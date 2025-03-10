"use client";
import { Badge, Button } from "@/components";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  badgeIcon: string;
  badgeTheme?: "obsidian" | "cerulean" | "red" | "amber" | "green";
  buttonText: string;
  onButtonClick?: () => void;
  imageUrl?: string;
  imageAlt?: string;
}

export function Card({
  title,
  subtitle,
  badgeIcon,
  badgeTheme = "green",
  buttonText,
  onButtonClick,
  imageUrl,
  imageAlt,
}: CardProps) {
  return (
    <div className="w-full max-w-xs transform overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg">
      {imageUrl ? (
        <>
          <div className="relative h-40 w-full">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="bg-slate-300 p-4">
            <h3 className="mb-1 text-lg font-bold">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{subtitle}</p>
            <div className="flex items-center justify-between">
              <Badge icon={badgeIcon} colorTheme={badgeTheme} />
              <Button colorTheme="cerulean" onClick={onButtonClick}>
                <span>{buttonText}</span>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="bg-slate-200 p-3 dark:bg-slate-500">
            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-50">{title}</h3>
            <p className="text-sm text-slate-900 dark:text-slate-50">{subtitle}</p>
          </div>
          <div className="mt-auto bg-slate-300 p-4 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <Badge icon={badgeIcon} colorTheme={badgeTheme} />
              <Button colorTheme="cerulean" onClick={onButtonClick}>
                <span>{buttonText}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

