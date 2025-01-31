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
    <div className="w-full max-w-xs border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      {imageUrl ? (
        <>
          <div className="relative w-full h-40">
            <Image 
              src={imageUrl} 
              alt={imageAlt || title} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="bg-slate-100 p-4">
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
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
          <div className="p-3 bg-white">
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <div className="bg-slate-100 p-4 mt-auto">
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