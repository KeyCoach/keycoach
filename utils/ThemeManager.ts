import { buttonGroupBackgroundSizes } from "@/constants/buttonGroupBackgroundSizes";
import {
	GameTheme,
	ThemeAssets,
	ButtonGroupConfig,
} from "@/constants/definitions";
import {
	ThemeAssetsDefinition,
	ThemeImagesDefinition,
	ThemeColorsDefinition,
	ThemeSoundsDefinition,
} from "@/constants/themes";

export class ThemeManager {
	private scene: Phaser.Scene | null = null;
	private shootingStarTimer?: Phaser.Time.TimerEvent;
	private currentTheme: GameTheme = "space";

	// Define theme assets for each theme
	private themeAssets: Record<GameTheme, ThemeAssets> = ThemeAssetsDefinition;

	constructor() {}

	setScene(scene: Phaser.Scene): void {
		this.scene = scene;
	}

	setTheme(theme: GameTheme): void {
		this.currentTheme = theme;

		// Skip if no scene is set
		if (!this.scene) return;

		// Update background image
		const backgroundObjects = this.scene.children.list.filter(
			(obj) => obj instanceof Phaser.GameObjects.Image && obj.depth === -1
		);

		if (backgroundObjects.length > 0) {
			const bg = backgroundObjects[0] as Phaser.GameObjects.Image;
			bg.setTexture(this.getAsset("background"));

			// Reset background size
			const { width, height } = this.scene.cameras.main;
			bg.setDisplaySize(width, height);
		} else {
			this.createBackground();
		}

		// Update menu backgrounds
		const menuBackgrounds = this.scene?.children.list.filter(
			(obj) => obj instanceof Phaser.GameObjects.Graphics && obj.depth === 1
		);

		console.log("scene key: " + this.scene.scene.key);

		if (typeof menuBackgrounds != "undefined" && menuBackgrounds.length > 0) {
			const menuBg = menuBackgrounds[0] as Phaser.GameObjects.Graphics;
			menuBg.clear();
			menuBg.fillStyle(this.getColor("menuBackground"), 0.7);

			// Update menu background
			const { width, height } = this.scene.cameras.main;
			menuBg.fillRoundedRect(width / 2 - 280, height / 2 - 165, 560, 330, 20);
		}

		// Update asteroids to match the current theme
		const asteroids = this.scene.children.list.filter(
			(obj) =>
				obj instanceof Phaser.GameObjects.Sprite &&
				(obj.texture.key === "asteroid" ||
					obj.texture.key === "balloon" ||
					obj.texture.key === "soccer-ball" ||
					obj.texture.key === "coconut")
		);

		if (asteroids.length > 0) {
			asteroids.forEach((asteroid) => {
				(asteroid as Phaser.GameObjects.Sprite).setTexture(
					this.getAsset("asteroid")
				);
			});
		}

		// Update ship sprite if it exists
		const ships = this.scene.children.list.filter(
			(obj) =>
				obj instanceof Phaser.GameObjects.Sprite && obj.texture.key === "ship"
		);

		if (ships.length > 0) {
			ships.forEach((ship) => {
				(ship as Phaser.GameObjects.Sprite).setTexture(this.getAsset("ship"));
			});
		}
	}

	getCurrentTheme(): GameTheme {
		return this.currentTheme;
	}

	getAsset(key: keyof ThemeImagesDefinition): string {
		if (key === "animation") {
			return this.themeAssets[this.currentTheme].images[key] as string;
		}
		return this.themeAssets[this.currentTheme].images[key];
	}

	getColor(key: keyof ThemeColorsDefinition): number {
		return this.themeAssets[this.currentTheme].colors[key];
	}

	getTextColor(key: keyof ThemeColorsDefinition): string {
		// Convert the numeric color to a hex string that Phaser text can use
		const colorValue = this.themeAssets[this.currentTheme].colors[key];
		return "#" + colorValue.toString(16).padStart(6, "0");
	}

	getSound(key: keyof ThemeSoundsDefinition): string {
		return this.themeAssets[this.currentTheme].sounds[key];
	}

	createBackground(): Phaser.GameObjects.Image | null {
		if (!this.scene) return null;

		const { width, height } = this.scene.cameras.main;
		return this.scene.add
			.image(width / 2, height / 2, this.getAsset("background"))
			.setOrigin(0.5)
			.setDisplaySize(width, height)
			.setDepth(-1); // Consistent depth for easy finding later
	}

	createMenuBackground(
		config: ButtonGroupConfig = {}
	): Phaser.GameObjects.Graphics | null {
		if (!this.scene) return null;

		const { width, height } = this.scene.cameras.main;

		config = buttonGroupBackgroundSizes[this.scene.scene.key];

		// TODO: refactor to use menuButtonBox naming
		const menuBackground = this.scene.add.graphics();
		const alpha = config.alpha || 0.7;
		menuBackground.fillStyle(this.getColor("menuBackground"), alpha);

		menuBackground.fillRoundedRect(
			width / 2 - config.width! / 2 - config.horizontalPadding!,
			height / 2 - config.height! / 2 - config.verticalPadding!,
			config.width!,
			config.height!,
			config.borderRadius
		);
		menuBackground.setDepth(-0.5);

		return menuBackground;
	}

	createThemeEffect(): void {
		// Each theme could have a different effect
		switch (this.currentTheme) {
			case "space":
				this.createShootingStar();
				break;
			case "birthday":
				this.createFloatingBalloon();
				break;
			case "soccer":
				this.createBouncingBall();
				break;
			case "beach":
				this.createWave();
				break;
		}
	}

	startThemeEffects(frequency: number = 5000): void {
		this.stopThemeEffects(); // Clean up existing

		if (!this.scene) return;

		this.shootingStarTimer = this.scene.time.addEvent({
			delay: frequency,
			callback: this.createThemeEffect,
			callbackScope: this,
			loop: true,
		});

		// Create one immediately
		this.createThemeEffect();
	}

	stopThemeEffects(): void {
		if (this.shootingStarTimer) {
			this.shootingStarTimer.destroy();
			this.shootingStarTimer = undefined;
		}
	}

	// Theme-specific effect methods
	private createShootingStar(): void {
		if (!this.scene) return;

		// Original shooting star code
		const { width, height } = this.scene.cameras.main;

		const startX = Phaser.Math.Between(0, width);
		const startY = -20;

		const star = this.scene.add
			.ellipse(startX, startY, 3, 12, this.getColor("primary"))
			.setDepth(0);

		// Rest of shooting star code...
	}

	private createFloatingBalloon(): void {
		// Birthday Party theme specific effect
	}

	private createBouncingBall(): void {
		// Soccer theme specific effect
	}

	private createWave(): void {
		// Beach theme specific effect
	}
}
