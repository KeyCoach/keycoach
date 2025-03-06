"use client";
import { useEffect, useState } from "react";

interface StarStyle {
  animationDuration: string;
  animationDelay: string;
  width: string;
  height: string;
  top: string;
  left: string;
}

export const Stars: React.FC<{ numDots: number }> = ({ numDots }) => {
  const [stars, setStars] = useState<StarStyle[]>([]);

  // Only generate stars on the client side after mounting
  useEffect(() => {
    const generatedStars = Array.from({ length: numDots }).map(() => {
      const starSize = (Math.random() * 4 + 2).toFixed(2);
      return {
        animationDuration: `${(Math.random() * 2 + 1).toFixed(2)}s`,
        animationDelay: `${(Math.random() * 8).toFixed(2)}s`,
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
          className="absolute animate-pulse rounded-full bg-white opacity-80"
          style={style}
        />
      ))}
    </div>
  );
};

// Then in your main component:
export default function Home(): React.ReactNode {
  // Use a fixed number for numDots to avoid hydration issues
  const numDots = 60; // or any fixed number

  // Rest of your component code
  return (
    <div className="h-page relative bg-gradient-to-b from-cerulean-800 to-cerulean-500">
      {/* Stars */}
      <Stars numDots={numDots} />

      {/* Rest of the component */}
    </div>
  );
}
