"use client";
import { useEffect, useState } from "react";

type StarStyle = {
  animationDuration: string;
  animationDelay: string;
  width: string;
  height: string;
  top: string;
  left: string;
};

export function Stars({ numDots }: { numDots: number }) {
  const [stars, setStars] = useState<StarStyle[]>([]);

  // Only generate stars on the client side after mounting
  useEffect(() => {
    const generatedStars = Array.from({ length: numDots }).map(() => {
      const starSize = (Math.random() * 4 + 2).toFixed(2);
      return {
        animationDuration: `${(Math.random() * 2 + 3).toFixed(2)}s`,
        animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
        width: `${starSize}px`,
        height: `${starSize}px`,
        top: `${(Math.random() * 96 + 2).toFixed(2)}%`,
        left: `${(Math.random() * 96 + 2).toFixed(2)}%`,
      };
    });

    setStars(generatedStars);
  }, [numDots]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((style, i) => (
        <div
          key={i}
          className="blink absolute -z-10 animate-pulse rounded-full bg-white opacity-80"
          style={style}
        />
      ))}
    </div>
  );
}
