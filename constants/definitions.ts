export type MultiplierInfo = {
	multiplier: number;
	progress: number;
	multiplierChanged?: boolean;
};

export type GameTheme = "space" | "birthday" | "soccer" | "beach";

export interface ThemeAssets {
	images: {
		background: string;
		asteroid: string;
		particle: string;
		ship: string;
		animation?: string;
	};
	colors: {
		primary: number;
		secondary: number;
		highlight: number;
		asteroidText: number;
		buttonFont: number;
		menuBackground: number;
		plainBackground: number;
		buttonBoxBackground: number;
	};
	sounds: {
		menuMusic: string;
		gameMusic: string;
		explosion: string;
		gameOver: string;
		levelUp: string;
		gameStart: string;
		missileFire: string;
	};
}

export interface ButtonGroupConfig {
	width?: number;
	height?: number;
	horizontalPadding?: number;
	verticalPadding?: number;
	borderRadius?: number;
	alpha?: number;
}

export interface GameSettings {
	theme: "space" | "birthday" | "soccer" | "beach";
	soundEnabled: boolean;
	musicVolume: number;
	sfxVolume: number;
}

export interface DatamuseWord {
	word: string;
	score?: number;
}

export interface Asteroid {
	sprite: Phaser.GameObjects.Sprite;
	text: Phaser.GameObjects.Text;
	textBackground?: Phaser.GameObjects.Rectangle;
	originalWord: string;
	word: string;
}

export interface StatsDisplay {
	destroy: () => void;
	continueButton: Phaser.GameObjects.Text;
	level?: number;
}

export interface NavigationItem {
	element: Phaser.GameObjects.GameObject;
	position: { row: number; col: number };
	onSelect?: () => void;
}
