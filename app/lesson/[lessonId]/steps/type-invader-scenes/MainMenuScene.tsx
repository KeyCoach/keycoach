import { Scene } from "phaser";
import { themeManager, soundManager } from "@/utils/type-invader-game";
import { colors, hexadecimalColors } from "@/constants/colors";
import { KeyboardNavigation } from "@/utils/NavigationUtils";
import { MenuTitle } from "@/components/type-invader/MenuTitle";

export class MainMenuScene extends Scene {
  private navigation!: KeyboardNavigation;
  private nextStarTime: number = 0;
  private menuTitle!: MenuTitle;

  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    this.load.image("particle", "/type-invader/assets/img/sprite/particle.png");
    this.load.image("ship", "/type-invader/assets/img/sprite/ship.png");

    // space
    this.load.image("blue-galaxy", "/type-invader/assets/img/space/blue-galaxy.png");
    this.load.image("asteroid", "/type-invader/assets/img/space/asteroid.png");
    this.load.audio("space-theme", "/type-invader/assets/audio/space/theme.mp3");
    this.load.audio("space-explosion", "/type-invader/assets/audio/space/explosion.m4a");

    // birthday party
    this.load.image("party-background", "/type-invader/assets/img/party/party-bg.png");
    this.load.image("balloon", "/type-invader/assets/img/party/white-balloon.png");
    // this.load.audio("party-theme", "/type-invader/assets/audio/party/theme.mp3");
    this.load.audio("birthday-explosion", "/type-invader/assets/audio/party/explosion.mp3");

    // soccer
    this.load.image("soccer-field", "/type-invader/assets/img/soccer/soccer-field.png");
    this.load.image("soccer-ball", "/type-invader/assets/img/soccer/soccer-ball.png");
    this.load.audio("soccer-theme", "/type-invader/assets/audio/soccer/theme.mp3");
    this.load.audio("soccer-explosion", "/type-invader/assets/audio/soccer/explosion.mp3");

    // beach
    this.load.image("beach-background", "/type-invader/assets/img/beach/beach-bg.png");
    this.load.image("coconut", "/type-invader/assets/img/beach/coconut.png");
    this.load.audio("beach-theme", "/type-invader/assets/audio/beach/theme.mp3");
    this.load.audio("beach-explosion", "/type-invader/assets/audio/beach/explosion.m4a");

    // menu
    this.load.audio("menu-music-1", "/type-invader/assets/audio/menu-1.mp3");
    this.load.audio("menu-music-2", "/type-invader/assets/audio/menu-2.mp3");
    this.load.audio("menu-music-3", "/type-invader/assets/audio/menu-3.mp3");

    // TOD: Add missile sound effects by theme
    // this.load.audio("{theme}-missile", "/type-invader/assets/audio/theme/missile.mp3");
  }

  create() {
    const { width, height } = this.cameras.main;

    // Set scene in managers
    themeManager.setScene(this);
    soundManager.setScene(this);

    // Start menu music
    soundManager.playMenuMusic();

    // Create background (either standard or glitch-style)
    themeManager.createBackground();
    themeManager.createMenuBackground();

    // Initialize keyboard navigation
    this.navigation = new KeyboardNavigation(this).init();

    // Create animated title using the new MenuTitle class
    // You can customize colors based on theme later
    this.menuTitle = new MenuTitle(this, "TYPE INVADERS", height / 2 - 100, "48px", {
      main: colors.white,
      shadow1: "#00FFFF", // Cyan
      shadow2: "#FF00FF", // Magenta
      glowColor: 0xffffff,
      glowAlpha: 0.1,
    });

    // Create and animate the title
    this.menuTitle.createAnimatedTitle(0, 120);

    // Play button
    const playButton = this.add
      .text(width / 2, height / 2 - 20, "Play Now", {
        fontSize: "32px",
        fontFamily: "Monospace",
        color: colors.blue,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => playButton.setColor(colors.teal))
      .on("pointerout", () => playButton.setColor(colors.blue))
      .on("pointerdown", () => this.scene.start("ModeSelectScene"));

    // Settings button
    const settingsButton = this.add
      .text(width / 2, height / 2 + 40, "Settings", {
        fontSize: "32px",
        fontFamily: "Monospace",
        color: colors.blue,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => settingsButton.setColor(colors.teal))
      .on("pointerout", () => settingsButton.setColor(colors.blue))
      .on("pointerdown", () => this.scene.start("SettingsScene"));

    // How to play button
    const howToPlayButton = this.add
      .text(width / 2, height / 2 + 100, "How To Play", {
        fontSize: "32px",
        fontFamily: "Monospace",
        color: colors.blue,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => howToPlayButton.setColor(colors.teal))
      .on("pointerout", () => howToPlayButton.setColor(colors.blue))
      .on("pointerdown", () => this.scene.start("HowToPlayScene"));

    // Add to navigation system
    this.navigation.addItems([
      {
        element: playButton,
        position: { row: 0, col: 0 },
        onSelect: () => this.scene.start("ModeSelectScene"),
      },
      {
        element: settingsButton,
        position: { row: 1, col: 0 },
        onSelect: () => this.scene.start("SettingsScene"),
      },
      {
        element: howToPlayButton,
        position: { row: 2, col: 0 },
        onSelect: () => this.scene.start("HowToPlayScene"),
      },
    ]);

    // Add instructions text
    // this.add
    //   .text(width / 2, height - 50, "Use arrow keys to navigate, ENTER to select", {
    //     fontSize: "16px",
    //     fontFamily: "Monospace",
    //     color: colors.white,
    //   })
    //   .setOrigin(0.5)
    //   .setDepth(1);

    // Initialize shooting star system
    this.nextStarTime = this.time.now + Phaser.Math.Between(500, 2000);
  }

  update() {
    const time = this.time.now;
    if (time > this.nextStarTime) {
      this.createShootingStar();
      this.nextStarTime = time + Phaser.Math.Between(500, 2000);

      // Occasionally trigger a title glitch effect when a shooting star appears
      if (Phaser.Math.Between(0, 10) > 7) {
        this.menuTitle.triggerFullGlitch();
      }
    }
  }

  shutdown() {
    themeManager.stopThemeEffects();
    // Clean up the menu title
    if (this.menuTitle) {
      this.menuTitle.destroy();
    }
  }

  private createShootingStar() {
    const { width, height } = this.cameras.main;

    // Random starting position along the top edge
    const startX = Phaser.Math.Between(0, width);
    const startY = -20;

    // Create the star using an ellipse
    const star = this.add
      .ellipse(
        startX,
        startY,
        3, // width
        12, // height
        hexadecimalColors.white,
      )
      .setDepth(0); // Ensure stars are behind menu

    // Calculate random endpoint
    const endX = startX + Phaser.Math.Between(-200, 200);
    const endY = height + 50;

    // Calculate angle for rotation
    const angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);
    star.rotation = angle - Math.PI / 2;

    // Create particle trail
    const particles = this.add
      .particles(startX, startY, "particle", {
        speed: { min: 10, max: 20 },
        scale: { start: 0.2, end: 0 },
        alpha: { start: 0.5, end: 0 },
        lifespan: 1000,
        blendMode: "ADD",
        frequency: 50,
        follow: star,
      })
      .setDepth(0); // Ensure particles are behind menu

    // Animate the star
    this.tweens.add({
      targets: star,
      x: endX,
      y: endY,
      duration: Phaser.Math.Between(2000, 4000),
      onComplete: () => {
        particles.destroy();
        star.destroy();
      },
    });
  }
}
