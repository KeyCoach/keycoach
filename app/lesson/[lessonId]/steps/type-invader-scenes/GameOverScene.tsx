// GameOverScene.tsx
import { Scene } from "phaser";
import { colors, hexadecimalColors } from "@/constants/colors";
import { KeyboardNavigation } from "@/utils/NavigationUtils";
import { themeManager, soundManager } from "@/utils/type-invader-game";

export class GameOverScene extends Scene {
  private score: number = 0;
  private navigation!: KeyboardNavigation;
  private nextStarTime: number = 0;
  private stats: {
    wpm: number;
    accuracy: number;
    wordsCompleted: number;
    mostProblematicChars: [string, number][];
  } | null = null;
  private titleContainer!: Phaser.GameObjects.Container;
  private letterElements: Phaser.GameObjects.Container[] = [];
  private glitchTimers: Phaser.Time.TimerEvent[] = [];

  constructor() {
    super({ key: "GameOverScene" });
  }

  init(data: {
    score: number;
    stats?: {
      wpm: number;
      accuracy: number;
      wordsCompleted: number;
      mostProblematicChars: [string, number][];
    } | null;
  }) {
    this.score = data.score;
    this.stats = data.stats ?? null;
  }

  create() {
    const { width, height } = this.cameras.main;

    themeManager.setScene(this);
    themeManager.createBackground();
    themeManager.createMenuBackground();

    // Initialize keyboard navigation
    this.navigation = new KeyboardNavigation(this).init();

    // Create animated title with position at its final destination
    // (letters will start off-screen and fall into this position)
    this.createAnimatedTitle("GAME OVER", width / 2, height / 5);

    // Create screen shake effect
    this.cameras.main.shake(1000, 0.01);

    // Add dramatic red flash
    const redFlash = this.add.rectangle(0, 0, width, height, 0xff0000)
      .setOrigin(0)
      .setAlpha(0.3)
      .setDepth(1);
    
    this.tweens.add({
      targets: redFlash,
      alpha: 0,
      duration: 1000,
      ease: 'Power2'
    });

    // Score display
    this.add
      .text(width / 2, height / 3, `Final Score: ${this.score}`, {
        fontSize: "32px",
        fontFamily: "Monospace",
        color: colors.whiteText,
      })
      .setOrigin(0.5)
      .setDepth(1);

    // Display typing statistics if available
    if (this.stats) {
      // Words Per Minute
      this.add
        .text(width / 2, height / 3 + 60, `Words Per Minute: ${this.stats.wpm}`, {
          fontSize: "24px",
          fontFamily: "Monospace",
          color: colors.whiteText,
        })
        .setOrigin(0.5)
        .setDepth(1);

      // Typing Accuracy
      this.add
        .text(width / 2, height / 3 + 110, `Accuracy: ${Math.round(this.stats.accuracy)}%`, {
          fontSize: "24px",
          fontFamily: "Monospace",
          color: colors.whiteText,
        })
        .setOrigin(0.5)
        .setDepth(1);

      // Words Completed
      this.add
        .text(width / 2, height / 3 + 160, `Words Completed: ${this.stats.wordsCompleted}`, {
          fontSize: "24px",
          fontFamily: "Monospace",
          color: colors.whiteText,
        })
        .setOrigin(0.5)
        .setDepth(1);

      // Most Problematic Characters
      if (this.stats.mostProblematicChars && this.stats.mostProblematicChars.length > 0) {
        let errorText = "Most Challenging Keys: ";
        this.stats.mostProblematicChars.forEach((char: [string, number], index: number) => {
          errorText += `'${char[0]}' (${char[1]})`;
          if (this.stats && index < this.stats.mostProblematicChars.length - 1) {
            errorText += ", ";
          }
        });

        this.add
          .text(width / 2, height / 3 + 210, errorText, {
            fontSize: "18px",
            fontFamily: "Monospace",
            color: colors.red,
          })
          .setOrigin(0.5)
          .setDepth(1);
      }
    }

    // Restart button - adjust position based on stats content
    const buttonY = this.stats && this.stats.mostProblematicChars && 
                   this.stats.mostProblematicChars.length > 0 
                   ? (height * 3) / 4 + 30 // Move down if we have error stats
                   : (height * 3) / 4 + 10; // Otherwise just a little adjustment
    
    const restartText = this.add
      .text(width / 2, buttonY, "RETURN TO MENU", {
        fontSize: "28px",
        fontFamily: "Monospace",
        color: colors.green,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => restartText.setColor(colors.teal))
      .on("pointerout", () => restartText.setColor(colors.blue))
      .on("pointerdown", () => {
        this.cleanupScene();
        this.scene.start("MainMenuScene");
      });

    // Add to navigation system
    this.navigation.addItem({
      element: restartText,
      position: { row: 0, col: 0 },
      onSelect: () => {
        this.cleanupScene();
        this.scene.start("MainMenuScene");
      },
    });

    // Add instructions text - move it up slightly to maintain spacing
    this.add
      .text(width / 2, height - 60, "Press ENTER to continue", {
        fontSize: "16px",
        fontFamily: "Monospace",
        color: colors.white,
      })
      .setOrigin(0.5);

    this.nextStarTime = this.time.now + Phaser.Math.Between(500, 2000);
    
    // Add falling debris particles for dramatic effect
    this.createDebrisParticles();
  }

  update() {
    const time = this.time.now;
    if (time > this.nextStarTime) {
      this.createShootingStar();
      this.nextStarTime = time + Phaser.Math.Between(500, 2000);
    }
  }

  private createAnimatedTitle(titleText: string, x: number, y: number) {
    // Create container for the animated title
    this.titleContainer = this.add.container(x, y).setDepth(3);
    
    // Split the text into individual letters for animation
    const letters = titleText.split('');
    const letterSpacing = 32; // Spacing between letters
    const totalWidth = letters.length * letterSpacing;
    const startX = -totalWidth / 2 + letterSpacing / 2;
    
    // Create each letter with colored shadows for a glitch effect
    letters.forEach((letter, i) => {
      if (letter === ' ') {
        // Just skip spaces in the animation
        return;
      }
      
      const letterContainer = this.add.container(startX + i * letterSpacing, 0);
      this.letterElements.push(letterContainer);
      
      // Create shadow effects for the glitch animation
      const shadow1 = this.add.text(0, 0, letter, {
        fontSize: "64px",
        fontFamily: "Monospace",
        color: "#FF0000", // Red shadow for game over
      }).setOrigin(0.5).setAlpha(0.8);
      
      const shadow2 = this.add.text(0, 0, letter, {
        fontSize: "64px",
        fontFamily: "Monospace",
        color: "#880000", // Dark red shadow for game over
      }).setOrigin(0.5).setAlpha(0.8);
      
      // Main text
      const mainText = this.add.text(0, 0, letter, {
        fontSize: "64px",
        fontFamily: "Monospace",
        color: colors.red, // Red for game over
      }).setOrigin(0.5);
      
      // Apply small random offset to the shadows for glitch effect
      shadow1.setPosition(-4, 4);
      shadow2.setPosition(4, -4);
      
      // Add elements to the letter container
      letterContainer.add([shadow2, shadow1, mainText]);
      
      // Add letter container to the title container
      this.titleContainer.add(letterContainer);
      
      // Initial position completely outside the screen
      letterContainer.y = -400; // Position well above the visible area
      
      // Add a slight random rotation
      letterContainer.setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(-15, 15)));
      
      // Animate the letter smashing in from above with a delay based on position
      this.tweens.add({
        targets: letterContainer,
        y: Phaser.Math.Between(-10, 10), // Final position with slight random variation
        rotation: Phaser.Math.DegToRad(Phaser.Math.Between(-5, 5)), // Final slight tilt
        duration: 800,
        delay: i * 120, // Staggered delay for each letter
        ease: 'Bounce.easeOut',
        onComplete: () => {
          // Add an intense shaking animation after the letter arrives
          this.tweens.add({
            targets: letterContainer,
            y: letterContainer.y + Phaser.Math.Between(-4, 4),
            x: letterContainer.x + Phaser.Math.Between(-2, 2),
            duration: Phaser.Math.Between(200, 400),
            yoyo: true,
            repeat: -1
          });
          
          // Add frequent glitch effect
          const glitchTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: () => this.createLetterGlitch(letterContainer, shadow1, shadow2, mainText),
            callbackScope: this,
            loop: true
          });
          
          this.glitchTimers.push(glitchTimer);
        }
      });
    });
  }

  private createLetterGlitch(
    letterContainer: Phaser.GameObjects.Container,
    shadow1: Phaser.GameObjects.Text,
    shadow2: Phaser.GameObjects.Text,
    mainText: Phaser.GameObjects.Text
  ) {
    // Randomly decide how intense the glitch should be
    const glitchIntensity = Phaser.Math.Between(1, 10);
    
    if (glitchIntensity > 7) {
      // Major glitch - dramatically shift shadows and flash main text
      const origShadow1X = shadow1.x;
      const origShadow1Y = shadow1.y;
      const origShadow2X = shadow2.x;
      const origShadow2Y = shadow2.y;
      
      shadow1.setPosition(
        origShadow1X - Phaser.Math.Between(8, 15),
        origShadow1Y + Phaser.Math.Between(8, 15)
      );
      
      shadow2.setPosition(
        origShadow2X + Phaser.Math.Between(8, 15),
        origShadow2Y - Phaser.Math.Between(8, 15)
      );
      
      // Briefly change the main text color
      const origColor = mainText.style.color;
      mainText.setColor('#FFFFFF');
      
      // Add a brief flash to the whole letter
      this.tweens.add({
        targets: letterContainer,
        alpha: 0.7,
        duration: 50,
        yoyo: true,
        repeat: 1
      });
      
      // Reset after short delay
      this.time.delayedCall(150, () => {
        shadow1.setPosition(origShadow1X, origShadow1Y);
        shadow2.setPosition(origShadow2X, origShadow2Y);
        mainText.setColor(origColor as string);
      });
    } else {
      // Minor glitch - slight shadow movement
      const origShadow1X = shadow1.x;
      const origShadow1Y = shadow1.y;
      const origShadow2X = shadow2.x;
      const origShadow2Y = shadow2.y;
      
      shadow1.setPosition(
        origShadow1X - Phaser.Math.Between(2, 6),
        origShadow1Y + Phaser.Math.Between(2, 6)
      );
      
      shadow2.setPosition(
        origShadow2X + Phaser.Math.Between(2, 6),
        origShadow2Y - Phaser.Math.Between(2, 6)
      );
      
      // Reset after short delay
      this.time.delayedCall(100, () => {
        shadow1.setPosition(origShadow1X, origShadow1Y);
        shadow2.setPosition(origShadow2X, origShadow2Y);
      });
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

  private createDebrisParticles() {
    const { width, height } = this.cameras.main;
    
    // Create debris particle emitter
    const debris = this.add.particles(0, 0, "particle", {
      x: { min: 0, max: width },
      y: -20,
      lifespan: 4000,
      speed: { min: 100, max: 200 },
      angle: { min: 80, max: 100 },
      gravityY: 100,
      scale: { start: 0.4, end: 0.1 },
      quantity: 1,
      frequency: 200,
      tint: [0xFF0000, 0xAA0000, 0x880000, 0x440000],
      rotate: { min: 0, max: 360 },
      alpha: { start: 1, end: 0 }
    }).setDepth(0);
    
    // Destroy the emitter after some time
    this.time.delayedCall(10000, () => {
      debris.destroy();
    });
  }

  private cleanupScene() {
    // Clear all glitch timers
    this.glitchTimers.forEach(timer => {
      if (timer) timer.destroy();
    });
    this.glitchTimers = [];
    
    // Stop all tweens
    this.tweens.killAll();
    
    // Clear all other timers
    this.time.removeAllEvents();
  }

  shutdown() {
    this.cleanupScene();
  }
}