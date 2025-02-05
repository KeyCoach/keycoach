type Duration = "fast" | "normal" | "slow";

interface BounceAnimationProps {
  duration?: Duration;
  delay?: number;
  startRotation?: number;
  middleRotation?: number;
  endRotation?: number;
  middleTranslate?: number;
  endTranslate?: number;
  fadeIn?: boolean;
  distance?: number;
  className?: string;
}

function getDuration(duration: Duration): string {
  const durations = {
    fast: "4s",
    normal: "6s",
    slow: "9s",
  };
  return durations[duration];
}

export function BounceAnimation({
  children,
  duration = "normal",
  delay = 2500,
  startRotation = -8,
  middleRotation = 12,
  endRotation = 2,
  middleTranslate = -5,
  endTranslate = -2,
  className = "",
}: BounceAnimationProps & { children: React.ReactNode }) {
  return (
    <div
      className={`animate-bounce ${className}`}
      style={
        {
          ["--duration" as string]: getDuration(duration),
          ["--delay" as string]: `${delay}ms`,
          ["--start-rotation" as string]: `${startRotation}deg`,
          ["--middle-rotation" as string]: `${middleRotation}deg`,
          ["--end-rotation" as string]: `${endRotation}deg`,
          ["--middle-translate" as string]: `${middleTranslate}px`,
          ["--end-translate" as string]: `${endTranslate}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
