// components/type-invader/TypingAsteroids.tsx
'use client';
import { useEffect, useRef } from "react";
import createGame from "@/utils/type-invader-game";

export default function TypingAsteroids() {
	const gameRef = useRef<Phaser.Game | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && !gameRef.current) {
			gameRef.current = createGame();
		}

		return () => {
			gameRef.current?.destroy(true);
			gameRef.current = null;
		};
	}, []);

	return <div id="game-container" />;
}
