type Direction = "up" | "down" | "left" | "right";
type Duration = "fast" | "normal" | "slow";

interface FadeInSectionProps {
  delay?: number;
  direction?: Direction;
  duration?: Duration;
  distance?: number;
  className?: string;
}

export function FadeInSection({
  children,
  delay = 0,
  direction = "up",
  duration = "normal",
  distance = 10,
  className = "",
}: FadeInSectionProps & { children: React.ReactNode }) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={
        {
          ["--delay" as string]: `${delay}ms`,
          ["--distance" as string]: `${distance}px`,
          ["--duration" as string]: getDuration(duration),
          ...getDirectionStyles(direction),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

function getDuration(duration: Duration): string {
  const durations = {
    fast: "0.4s",
    normal: "0.7s",
    slow: "1s",
  };
  return durations[duration];
}

function getDirectionStyles(direction: Direction) {
  const styles = {
    up: {
      ["--translate-x" as string]: "0",
      ["--translate-y" as string]: "var(--distance)",
    },
    down: {
      ["--translate-x" as string]: "0",
      ["--translate-y" as string]: "calc(var(--distance) * -1)",
    },
    left: {
      ["--translate-x" as string]: "var(--distance)",
      ["--translate-y" as string]: "0",
    },
    right: {
      ["--translate-x" as string]: "calc(var(--distance) * -1)",
      ["--translate-y" as string]: "0",
    },
  };
  return styles[direction];
}
