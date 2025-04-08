// GameUI.ts
import { Scene } from "phaser";
import { colors, hexadecimalColors } from "@/constants/colors";
import PauseButton from "@/components/type-invader/PauseButton";
import { StatsDisplay } from "@/constants/definitions";
import { soundManager, themeManager } from "@/utils/type-invader-game";

export class GameUI {
  private scene: Scene;
  private scoreText: Phaser.GameObjects.Text;
  private scoreLabel: Phaser.GameObjects.Text;
  private scoreUpdateText: Phaser.GameObjects.Text | null = null;
  private scoreUpdateMultiplier: Phaser.GameObjects.Text | null = null;
  private timerText: Phaser.GameObjects.Text;
  private levelText: Phaser.GameObjects.Text;
  private multiplierText: Phaser.GameObjects.Text;
  private progressBar: Phaser.GameObjects.Graphics;
  private progressBarBg: Phaser.GameObjects.Graphics;
  private statsElements: Phaser.GameObjects.GameObject[] = [];
  private letterGlitchTimers: Phaser.Time.TimerEvent[] = [];

  constructor(scene: Scene, togglePause: () => void) {
    this.scene = scene;
    const { width, height } = this.scene.cameras.main;

    // Create all UI elements
    this.scoreLabel = this.scene.add.text(32, 520, "Score: ", {
      fontSize: "32px",
      fontFamily: "Monospace",
      color: themeManager.getTextColor("primary"),
    });

    this.scoreText = this.scene.add.text(this.scoreLabel.x + this.scoreLabel.width - 2, 520, "0", {
      fontSize: "32px",
      fontFamily: "Monospace",
      color: themeManager.getTextColor("primary"),
    });

    // Create timer text
    this.timerText = this.scene.add.text(width - 110, 520, "00:30", {
      fontSize: "32px",
      fontFamily: "Monospace",
      color: themeManager.getTextColor("primary"),
    });

    // Create level text (initially hidden)
    this.levelText = this.scene.add
      .text(width / 2, height / 2, "", {
        fontSize: "48px",
        fontFamily: "Monospace",
        color: themeManager.getTextColor("highlight"),
      })
      .setOrigin(0.5)
      .setAlpha(0);

    // Create multiplier text
    this.multiplierText = this.scene.add.text(32, 485, "1x", {
      fontSize: "24px",
      fontFamily: "Monospace",
      color: themeManager.getTextColor("highlight"),
    });

    // Create pause button
    new PauseButton(scene, 25, 25, togglePause);

    // Create progress bar background
    this.progressBarBg = this.scene.add.graphics();
    this.progressBarBg.fillStyle(0x666666, 0.3);
    this.progressBarBg.fillRect(0, height - 10, width, 10);

    // Create progress bar (initially empty)
    this.progressBar = this.scene.add.graphics();

    // Set depth to ensure UI is always on top
    this.scoreText.setDepth(2);
    this.scoreLabel.setDepth(2);
    this.timerText.setDepth(2);
    this.levelText.setDepth(2);
    this.multiplierText.setDepth(2);
    this.progressBar.setDepth(2);
    this.progressBarBg.setDepth(1);
  }

  updateScore(score: number) {
    this.scoreText.setText(`${score}`);
  }

  showScoreUpdate(score: number, increase: number, multiplier: number) {
    const scoreUpdateX = Phaser.Math.Between(80, 220);
    const scoreUpdateY = Phaser.Math.Between(495, 505);
    const scoreUpdateTravelDistance = Phaser.Math.Between(80, 100);

    // Clear previous score update if it exists
    if (this.scoreUpdateText) {
      this.scoreUpdateText.destroy();
    }
    if (this.scoreUpdateMultiplier) {
      this.scoreUpdateMultiplier.destroy();
    }

    this.scoreUpdateText = this.scene.add.text(scoreUpdateX, scoreUpdateY, `+${increase}`, {
      fontSize: "22px",
      color: themeManager.getTextColor("secondary"),
    });

    // Apply random rotation for visual flair
    this.scoreUpdateText.rotation = Phaser.Math.DegToRad(Phaser.Math.Between(-30, 30));

    // Add multiplier indicator if multiplier > 1
    if (multiplier > 1) {
      this.scoreUpdateMultiplier = this.scene.add.text(
        this.scoreUpdateText.x + this.scoreUpdateText.width + 5,
        scoreUpdateY,
        `(${multiplier}x)`,
        {
          fontSize: "18px",
          color: themeManager.getTextColor("highlight"),
        },
      );

      this.scene.tweens.add({
        targets: this.scoreUpdateMultiplier,
        y: scoreUpdateY - scoreUpdateTravelDistance,
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          if (this.scoreUpdateMultiplier) {
            this.scoreUpdateMultiplier.destroy();
            this.scoreUpdateMultiplier = null;
          }
        },
      });
    }

    // Animate and destroy score update
    this.scene.tweens.add({
      targets: this.scoreUpdateText,
      y: scoreUpdateY - scoreUpdateTravelDistance,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        if (this.scoreUpdateText) {
          this.scoreUpdateText.destroy();
          this.scoreUpdateText = null;
        }
      },
    });
  }

  updateTimer(seconds: number) {
    this.timerText.setText(`00:${String(seconds).padStart(2, "0")}`);

    // Make timer text red when time is running low (under 10 seconds)
    if (seconds <= 10) {
      this.timerText.setColor(colors.red);
    } else {
      this.timerText.setColor(themeManager.getTextColor("primary"));
    }
  }

  updateMultiplier(multiplier: number, animate: boolean = false) {
    this.multiplierText.setText(`${multiplier}x`);
    this.multiplierText.setColor(themeManager.getTextColor("highlight"));

    // Add animation effect if requested
    if (animate) {
      this.scene.tweens.add({
        targets: this.multiplierText,
        scale: { from: 1.5, to: 1 },
        duration: 200,
        ease: "Bounce",
      });
    }
  }

  showLevelText(level: number) {
    this.levelText.setText(`Level ${level}`).setAlpha(1);
    this.levelText.setColor(colors.yellow);

    // Fade out after a delay
    this.scene.tweens.add({
      targets: this.levelText,
      alpha: 0,
      duration: 2000, // Fades out over 2 seconds
    });
  }

  updateProgressBar(progress: number) {
    const { width, height } = this.scene.cameras.main;

    this.progressBar.clear();
    this.progressBar.fillStyle(themeManager.getColor("secondary"), 0.7);
    this.progressBar.fillRect(0, height - 6, width * progress, 6);
  }

  createMissile(shipX: number, shipY: number, targetX: number, targetY: number): void {
    // Use the theme's secondary color for missiles
    const missile = this.scene.add.ellipse(
      shipX,
      shipY - 20,
      8,
      16,
      themeManager.getColor("secondary"),
    );

    // Calculate angle between ship and target
    const angle = Phaser.Math.Angle.Between(missile.x, missile.y, targetX, targetY);

    // Rotate missile to point at target
    missile.rotation = angle - Math.PI / 2;

    // Animate missile
    this.scene.tweens.add({
      targets: missile,
      x: targetX,
      y: targetY,
      duration: 200, // Adjust speed as needed
      onComplete: () => {
        // Create small impact effect
        const impact = this.scene.add.particles(targetX, targetY, "particle", {
          speed: { min: 20, max: 40 },
          scale: { start: 0.4, end: 0 },
          lifespan: 200,
          quantity: 3,
          blendMode: "ADD",
          tint: [themeManager.getColor("secondary")],
        });

        // Clean up impact and missile
        this.scene.time.delayedCall(200, () => {
          impact.destroy();
          missile.destroy();
        });
      },
    });
  }

  showStats(stats: {
    wpm: number;
    accuracy: number;
    wordsCompleted: number;
    totalKeysPressed: number;
    mostProblematicChars?: [string, number][];
    level?: number;
  }): StatsDisplay {
    const { width, height } = this.scene.cameras.main;
    this.clearStatsElements();

    // Create semi-transparent background with theme-appropriate color
    const bgColor = themeManager.getColor("menuBackground");
    const bg = this.scene.add
      .rectangle(width / 2, height / 2, width * 0.7, height * 0.6, bgColor, 0.85)
      .setDepth(3);
    this.statsElements.push(bg);

    // Create animated level completion title
    this.createAnimatedLevelTitle(stats.level || 1, width / 2, height / 2 - 130);

    // Add celebration particles
    const particles = this.scene.add
      .particles(width / 2, height / 2 - 50, "particle", {
        speed: { min: 150, max: 300 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.8, end: 0 },
        lifespan: 3000,
        quantity: 3,
        frequency: 200,
        blendMode: "ADD",
        tint: [themeManager.getColor("highlight"), themeManager.getColor("secondary")], // Use theme colors
      })
      .setDepth(2);

    // Stop particles after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      particles.stop();
    });

    this.statsElements.push(particles);

    const statsText = this.scene.add
      .text(
        width / 2,
        height / 2 - 10, // Adjusted position to accommodate larger title
        `WPM: ${stats.wpm}  |  Accuracy: ${Math.round(stats.accuracy)}%`,
        {
          fontSize: "22px",
          fontFamily: "Monospace",
          color: themeManager.getTextColor("primary"),
        },
      )
      .setOrigin(0.5)
      .setDepth(3);
    this.statsElements.push(statsText);

    const wordsCompletedText = this.scene.add
      .text(
        width / 2,
        height / 2 + 20, // Adjusted position to accommodate larger title
        `Words Completed: ${stats.wordsCompleted}  |  Keys Pressed: ${stats.totalKeysPressed}`,
        {
          fontSize: "18px",
          fontFamily: "Monospace",
          color: themeManager.getTextColor("primary"),
        },
      )
      .setOrigin(0.5)
      .setDepth(3);
    this.statsElements.push(wordsCompletedText);

    // Show most problematic characters if available
    if (stats.mostProblematicChars && stats.mostProblematicChars.length > 0) {
      let errorText = "Most Errors: ";
      stats.mostProblematicChars.forEach((char: [string, number], index: number) => {
        errorText += `'${char[0]}' (${char[1]})`;
        if (stats.mostProblematicChars && index < stats.mostProblematicChars.length - 1) {
          errorText += ", ";
        }
      });

      const problemCharsText = this.scene.add
        .text(width / 2, height / 2 + 50, errorText, {
          // Adjusted position
          fontSize: "18px",
          fontFamily: "Monospace",
          color: colors.red,
        })
        .setOrigin(0.5)
        .setDepth(3);
      this.statsElements.push(problemCharsText);
    }

    // Add continue button
    const continueButton = this.scene.add
      .text(width / 2, height / 2 + 120, "Continue", {
        // Adjusted position
        fontSize: "28px", // Increased font size for button
        fontFamily: "Monospace",
        color: themeManager.getTextColor("buttonFont"),
      })
      .setOrigin(0.5)
      .setDepth(3)
      .setInteractive()
      .on("pointerover", () => continueButton.setColor(themeManager.getTextColor("highlight")))
      .on("pointerout", () => continueButton.setColor(themeManager.getTextColor("buttonFont")));

    this.statsElements.push(continueButton);

    return {
      destroy: () => this.clearStatsElements(),
      continueButton,
    };
  }

  private createAnimatedLevelTitle(level: number, x: number, y: number) {
    // Create title text
    const titleText = `LEVEL ${level} COMPLETED`;

    // Create container for the title at its final destination position
    const titleContainer = this.scene.add.container(x, y).setDepth(3);
    this.statsElements.push(titleContainer);

    // Split text into individual letters
    const letters = titleText.split("");
    const letterSpacing = 28; // Spacing between letters
    const totalWidth = letters.length * letterSpacing;
    const startX = -totalWidth / 2 + letterSpacing / 2;

    // Create each letter with colored shadows for a glitch effect
    letters.forEach((letter, i) => {
      if (letter === " ") {
        // Skip spaces in animation
        return;
      }

      // Create letter container positioned at its final x position
      const letterContainer = this.scene.add.container(startX + i * letterSpacing, 0);

      // Use theme colors for shadow effects
      const shadow1 = this.scene.add
        .text(0, 0, letter, {
          fontSize: "56px",
          fontFamily: "Monospace",
          color: themeManager.getTextColor("secondary"), // First shadow matches secondary theme color
        })
        .setOrigin(0.5)
        .setAlpha(0.8);

      const shadow2 = this.scene.add
        .text(0, 0, letter, {
          fontSize: "56px",
          fontFamily: "Monospace",
          color: themeManager.getTextColor("highlight"), // Second shadow matches highlight theme color
        })
        .setOrigin(0.5)
        .setAlpha(0.8);

      // Main text
      const mainText = this.scene.add
        .text(0, 0, letter, {
          fontSize: "56px",
          fontFamily: "Monospace",
          color: themeManager.getTextColor("primary"), // Main text uses primary theme color
        })
        .setOrigin(0.5);

      // Apply small random offset to the shadows for glitch effect
      shadow1.setPosition(-4, 4);
      shadow2.setPosition(4, -4);

      // Add elements to the letter container
      letterContainer.add([shadow1, shadow2, mainText]);

      // Add letter container to the title container
      titleContainer.add(letterContainer);

      // Initial position well above the screen
      letterContainer.y = -400;

      // Add a slight random rotation
      letterContainer.setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(-15, 15)));

      // Animate the letter falling in from above with a delay based on position
      this.scene.tweens.add({
        targets: letterContainer,
        y: 0, // Final position at the container's origin
        rotation: 0, // Straighten the letter
        duration: 800,
        delay: i * 50, // Staggered delay for each letter
        ease: "Bounce.easeOut",
        onComplete: () => {
          // Add a subtle floating animation after the letter arrives
          this.scene.tweens.add({
            targets: letterContainer,
            y: Phaser.Math.Between(-4, 4), // Random slight float
            duration: Phaser.Math.Between(1500, 2500),
            yoyo: true,
            repeat: -1,
            delay: Phaser.Math.Between(0, 300), // Randomize timing for each letter
          });

          // Add occasional glitch effect
          const glitchTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(1500, 3000),
            callback: () => {
              // Temporarily increase shadow offset for glitch effect
              const origShadow1X = shadow1.x;
              const origShadow1Y = shadow1.y;
              const origShadow2X = shadow2.x;
              const origShadow2Y = shadow2.y;

              shadow1.setPosition(
                origShadow1X - Phaser.Math.Between(4, 8),
                origShadow1Y + Phaser.Math.Between(4, 8),
              );

              shadow2.setPosition(
                origShadow2X + Phaser.Math.Between(4, 8),
                origShadow2Y - Phaser.Math.Between(4, 8),
              );

              // Reset after short delay
              this.scene.time.delayedCall(150, () => {
                shadow1.setPosition(origShadow1X, origShadow1Y);
                shadow2.setPosition(origShadow2X, origShadow2Y);
              });
            },
            callbackScope: this,
            loop: true,
          });

          this.letterGlitchTimers.push(glitchTimer);
        },
      });
    });
  }

  private clearStatsElements() {
    // Stop all glitch timers
    this.letterGlitchTimers.forEach((timer) => {
      if (timer) timer.destroy();
    });
    this.letterGlitchTimers = [];

    // Destroy all elements
    this.statsElements.forEach((element) => element.destroy());
    this.statsElements = [];
  }
}

