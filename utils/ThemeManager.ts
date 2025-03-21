import { buttonGroupBackgroundSizes } from "@/constants/buttonGroupBackgroundSizes";
import { colors } from "@/constants/colors";
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
import { gameSettings } from "@/utils/type-invader-game";

export class ThemeManager {
	private scene: Phaser.Scene | null = null;
	private shootingStarTimer?: Phaser.Time.TimerEvent;
	private currentTheme: GameTheme = "space";

	// Define theme assets for each theme
	private themeAssets: Record<GameTheme, ThemeAssets> = ThemeAssetsDefinition;

	constructor() {
		// Detect system color scheme and set initial theme
		this.detectColorScheme();

		// Listen for color scheme changes
		if (typeof window !== 'undefined') {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
				this.detectColorScheme();
			});

			// Also listen for theme changes in the app (if theme toggle exists)
			document.addEventListener('themeToggle', () => {
				this.detectColorScheme();
			});
		}
	}

	/**
	 * Detects the current color scheme and sets the appropriate theme
	 */
	private detectColorScheme(): void {
		// Check if window is available (avoid SSR issues)
		if (typeof window === 'undefined') return;

		// Check for dark mode - either from media query or from HTML class
		const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ||
						  document.documentElement.classList.contains('dark');
		
		// Set theme based on color scheme
		if (isDarkMode) {
			this.currentTheme = "space";
		} else {
			this.currentTheme = "beach";
		}

		// Also update gameSettings
		gameSettings.theme = this.currentTheme;
	}

	setScene(scene: Phaser.Scene): void {
		this.scene = scene;
	}

	setTheme(theme: GameTheme): void {
		this.currentTheme = theme;
		gameSettings.theme = theme;

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

		if (typeof menuBackgrounds != "undefined" && menuBackgrounds.length > 0) {
			const menuBg = menuBackgrounds[0] as Phaser.GameObjects.Graphics;
			menuBg.clear();
			menuBg.fillStyle(this.getColor("menuBackground"), 0.7);

			// Update menu background
			const { width, height } = this.scene.cameras.main;
			menuBg.fillRoundedRect(width / 2 - 280, height / 2 - 165, 560, 330, 20);
		}

		// Update text colors for all UI elements
		this.updateUIColors();

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

	// Update colors for UI elements based on theme
	private updateUIColors(): void {
		if (!this.scene) return;

		// Update text elements
		const textElements = this.scene.children.list.filter(
			(obj) => obj instanceof Phaser.GameObjects.Text
		) as Phaser.GameObjects.Text[];

		if (textElements.length > 0) {
			const isDarkTheme = this.currentTheme === "space" || this.currentTheme === "soccer";

			textElements.forEach(text => {
				// Skip already colored specific elements
				if (text.text.includes("Score")) {
					text.setColor(this.getTextColor("primary"));
				} else if (text.text.includes("x") && text.text.length <= 3) {
					// This is likely the multiplier text
					text.setColor(this.getTextColor("highlight"));
				} else if (text.text.match(/^00:\d\d$/)) {
					// This is likely the timer text
					text.setColor(this.getTextColor("primary"));
				} else if (text.style.color === colors.green) {
					// Update button text colors
					text.setColor(this.getTextColor("buttonFont"));
				} else if (text.style.color === colors.red) {
					// Low timer warning should stay red for visibility
					text.setColor("#FF3333");
				} else if (text.style.color === colors.yellow) {
					// Highlighted elements
					text.setColor(this.getTextColor("highlight"));
				}
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

	createPlainBackground(): Phaser.GameObjects.Graphics | null {
		if (!this.scene) return null;

		const { width, height } = this.scene.cameras.main;
		const background = this.scene.add.graphics();
		background.fillStyle(this.getColor("plainBackground"), 1);
		background.fillRect(0, 0, width, height);
		background.setDepth(-1);

		return background;
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