"use client";
import { Game, Types } from "phaser";
import { ThemeManager } from "./ThemeManager";
import { SoundManager } from "./SoundManager";
import { MainMenuScene } from "../app/lesson/[lessonId]/steps/type-invader-scenes/MainMenuScene";
import { GameScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/GameScene";
import { GameOverScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/GameOverScene";
import { ModeSelectScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/ModeSelectScene";
import { LetterSelectScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/LetterSelectScene";
import { PauseScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/PauseScene";
import { SettingsScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/SettingsScene";
import { HowToPlayScene } from "@/app/lesson/[lessonId]/steps/type-invader-scenes/HowToPlayScene";
import { GameSettings } from "@/constants/definitions";

export const gameSettings: GameSettings = {
  theme: "space",
  musicVolume: 0.5,
  sfxVolume: 0.5,
  soundEnabled: true,
};

export const themeManager = new ThemeManager();
export const soundManager = new SoundManager(themeManager);

export const gameConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#292929",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [
    MainMenuScene,
    ModeSelectScene,
    LetterSelectScene,
    GameScene,
    GameOverScene,
    PauseScene,
    SettingsScene,
    HowToPlayScene,
  ],
};

export default function createGame() {
  return new Game(gameConfig);
}
