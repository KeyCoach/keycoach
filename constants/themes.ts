import { Scene } from "phaser";
import { GameTheme, ThemeAssets } from "./definitions";

export interface ThemeImagesDefinition {
  background: string;
  asteroid: string;
  particle: string;
  ship: string;
  animation?: string;
}

export interface ThemeColorsDefinition {
  primary: number;
  secondary: number;
  highlight: number;
  asteroidText: number;
  buttonFont: number;
  buttonBoxBackground: number;
  menuBackground: number;
  plainBackground: number;
}

export interface ThemeSoundsDefinition {
  menuMusic: string;
  gameMusic: string;
  explosion: string;
  gameOver: string;
  levelUp: string;
  gameStart: string;
  missileFire: string;
}

const themeImages: Record<GameTheme, ThemeImagesDefinition> = {
  space: {
    background: "blue-galaxy",
    asteroid: "asteroid",
    particle: "particle",
    ship: "ship",
    animation: "spin",
  },
  birthday: {
    background: "party-background",
    asteroid: "balloon",
    particle: "confetti",
    ship: "party-hat",
    animation: "sway",
  },
  soccer: {
    background: "soccer-field",
    asteroid: "soccer-ball",
    particle: "soccer-ball",
    ship: "soccer-player",
    animation: "kick",
  },
  beach: {
    background: "beach-background",
    asteroid: "coconut",
    particle: "water-splash",
    ship: "surfboard",
    animation: "ride",
  },
};

const themeColors: Record<GameTheme, ThemeColorsDefinition> = {
  // Dark Theme: Space - Cool blue/cyan color scheme
  space: {
    primary: 0xf0f0f0,        // Bright white for main text
    secondary: 0x62cde6,       // Bright cyan for secondary elements
    highlight: 0x00ffff,       // Cyan highlight for important elements
    asteroidText: 0xffffff,    // White text on asteroids for high contrast
    buttonFont: 0x00cc99,      // Teal green for buttons
    buttonBoxBackground: 0x222233, // Dark blue-gray for button backgrounds
    menuBackground: 0x111122,   // Very dark blue for menu backgrounds
    plainBackground: 0x020617,  // Nearly black blue for plain backgrounds
  },
  
  // Dark Theme: Soccer - Green and white color scheme
  soccer: {
    primary: 0xf0f0f0,         // Bright white for main text
    secondary: 0x8aff8a,       // Light green for secondary elements
    highlight: 0x00ff7f,       // Bright green highlight
    asteroidText: 0xffffff,    // White text on soccer balls
    buttonFont: 0x00dd55,      // Bright green for buttons
    buttonBoxBackground: 0x333333, // Dark gray for button backgrounds
    menuBackground: 0x1a1a1a,   // Very dark gray for menu backgrounds
    plainBackground: 0x0a1a0a,  // Very dark green-tinted black
  },
  
  // Light Theme: Birthday - Vibrant party colors
  birthday: {
    primary: 0x222222,         // Dark gray for main text (good contrast on light bg)
    secondary: 0xff55dd,       // Pink for secondary elements
    highlight: 0xff3399,       // Bright pink highlight
    asteroidText: 0x000000,    // Black text on balloons
    buttonFont: 0xdd0088,      // Deep pink for buttons
    buttonBoxBackground: 0xf8d2ff, // Very light pink for button backgrounds
    menuBackground: 0xfff0ff,   // Nearly white pink for menu backgrounds
    plainBackground: 0xffecf5,  // Very light pink for plain backgrounds
  },
  
  // Light Theme: Beach - Tropical beach colors
  beach: {
    primary: 0x003366,         // Deep blue for main text (good contrast on light bg)
    secondary: 0x0088cc,       // Medium blue for secondary elements
    highlight: 0xff9933,       // Orange highlight for important elements
    asteroidText: 0x000000,    // Black text on coconuts
    buttonFont: 0x0066aa,      // Ocean blue for buttons
    buttonBoxBackground: 0xd1f6ff, // Very light blue for button backgrounds
    menuBackground: 0xebf9ff,   // Nearly white blue for menu backgrounds
    plainBackground: 0xe6f7ff,  // Very light blue for plain backgrounds
  },
};

// Define the sounds for each theme
const themeSounds: Record<GameTheme, ThemeSoundsDefinition> = {
  space: {
    menuMusic: "space-menu-music",
    gameMusic: "space-game-music",
    explosion: "space-explosion",
    gameOver: "space-game-over",
    levelUp: "space-level-up",
    gameStart: "space-game-start",
    missileFire: "space-missile-fire",
  },
  birthday: {
    menuMusic: "birthday-menu-music",
    gameMusic: "birthday-game-music",
    explosion: "birthday-explosion",
    gameOver: "birthday-game-over",
    levelUp: "birthday-level-up",
    gameStart: "birthday-game-start",
    missileFire: "birthday-missile-fire",
  },
  soccer: {
    menuMusic: "soccer-menu-music",
    gameMusic: "soccer-game-music",
    explosion: "soccer-explosion",
    gameOver: "soccer-game-over",
    levelUp: "soccer-level-up",
    gameStart: "soccer-game-start",
    missileFire: "soccer-missile-fire",
  },
  beach: {
    menuMusic: "beach-menu-music",
    gameMusic: "beach-game-music",
    explosion: "beach-explosion",
    gameOver: "beach-game-over",
    levelUp: "beach-level-up",
    gameStart: "beach-game-start",
    missileFire: "beach-missile-fire",
  },
};

// Combine both definitions into the ThemeAssetsDefinition
export const ThemeAssetsDefinition: Record<GameTheme, ThemeAssets> = {
  space: {
    images: themeImages.space,
    colors: themeColors.space,
    sounds: themeSounds.space,
  },
  birthday: {
    images: themeImages.birthday,
    colors: themeColors.birthday,
    sounds: themeSounds.birthday,
  },
  soccer: {
    images: themeImages.soccer,
    colors: themeColors.soccer,
    sounds: themeSounds.soccer,
  },
  beach: {
    images: themeImages.beach,
    colors: themeColors.beach,
    sounds: themeSounds.beach,
  },
};

export { themeImages, themeColors };