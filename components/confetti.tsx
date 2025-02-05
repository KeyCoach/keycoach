"use client";
import JSConfetti from "js-confetti";

interface ConfettiProps {
  confettiAmount?: number;
  confettiRadius?: number;
  emojis?: string[];
  confettiColors?: string[];
}

export function Confetti({
  confettiAmount = 100,
  confettiRadius = 8,
  emojis,
  confettiColors,
}: ConfettiProps) {
  const jsConfetti = new JSConfetti();

  const triggerConfetti = () => {
    const confettiProps: ConfettiProps = {
      confettiRadius,
      confettiAmount,
    };

    if (Math.random() > 0.5) {
      confettiProps.emojis = emojis || ["🎉", "🎊", "🥳", "🚀", "🌟"];
    } else {
      confettiProps.confettiColors = confettiColors || [
        "#E8975F",
        "#73C89B",
        "#6CB9DA",
        "#EB847F",
        "#669CD7",
        "#f2f2f2",
      ];
    }

    jsConfetti.addConfetti(confettiProps);
  };

  return { triggerConfetti };
}
