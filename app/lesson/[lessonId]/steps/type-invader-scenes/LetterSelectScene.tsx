import { Scene } from "phaser";
import { colors, hexadecimalColors } from "@/constants/colors";
import { KeyboardNavigation } from "@/utils/NavigationUtils";
import { themeManager } from "@/utils/type-invader-game";
import { NavigationItem } from "@/constants/definitions";

export class LetterSelectScene extends Scene {
  private navigation!: KeyboardNavigation;

  constructor() {
    super({ key: "LetterSelectScene" });
  }

  create() {
    const { width, height } = this.cameras.main;

    themeManager.setScene(this);
    themeManager.createBackground();
    themeManager.createMenuBackground();

    // Initialize keyboard navigation
    this.navigation = new KeyboardNavigation(this).init();

    // Letters select screen container
    // const menuHeight = 380;
    // const menuWidth = 480;

    // Get the current theme from the theme manager
  const currentTheme = themeManager.getCurrentTheme();

  // Determine text color based on the theme
  const textColor = (currentTheme === "space" || currentTheme === "soccer") 
      ? colors.white 
      : colors.black;

    // Title
    this.add
      .text(width / 2, height / 6, "Select a Letter", {
        fontSize: "40px",
        fontFamily: "Monospace",
        color: textColor,
      })
      .setOrigin(0.5)
      .setDepth(1);

    // Create letter grid
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const itemsPerRow = 7;
    const padding = 20;
    const buttonWidth = 60;
    const buttonHeight = 60;
    const startX = (width - itemsPerRow * (buttonWidth + padding)) / 2 + buttonWidth / 2;
    const startY = height / 3;

    // Navigation items for letters
    const navigationItems: NavigationItem[] = [];

    letters.forEach((letter, index) => {
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;
      const x = startX + col * (buttonWidth + padding);
      const y = startY + row * (buttonHeight + padding);

      const letterButton = this.add
        .rectangle(x, y, buttonWidth, buttonHeight, hexadecimalColors.menuButtonBg)
        .setInteractive({ useHandCursor: true });

      const letterText = this.add
        .text(x, y, letter, {
          fontSize: "32px",
          fontFamily: "Monospace",
          color: colors.white,
        })
        .setOrigin(0.5)
        .setDepth(1);

      // Group button and text for hover effects
      const buttonGroup = [letterButton, letterText];

      letterButton
        .on("pointerover", () => {
          letterButton.setFillStyle(0x666666);
          letterText.setColor(colors.teal);
        })
        .on("pointerout", () => {
          letterButton.setFillStyle(hexadecimalColors.menuButtonBg);
          letterText.setColor(colors.white);
        })
        .on("pointerdown", () => {
          this.scene.start("GameScene", {
            mode: "letter",
            letter: letter.toLowerCase(),
          });
        });

      // Add to navigation items
      navigationItems.push({
        element: letterButton,
        position: { row, col },
        onSelect: () => {
          this.scene.start("GameScene", {
            mode: "letter",
            letter: letter.toLowerCase(),
          });
        },
      });

      // Also add text element (both will highlight together)
      navigationItems.push({
        element: letterText,
        position: { row, col },
        onSelect: () => {
          this.scene.start("GameScene", {
            mode: "letter",
            letter: letter.toLowerCase(),
          });
        },
      });
    });

    // Back button
    const backButton = this.add
      .text(32, height - 40, "← Back", {
        fontSize: "24px",
        fontFamily: "Monospace",
        color: textColor,
        // name: "backButton",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => backButton.setColor(colors.green))
      .on("pointerout", () => backButton.setColor(textColor))
      .on("pointerdown", () => this.scene.start("ModeSelectScene"));

    // Add back button to navigation
    navigationItems.push({
      element: backButton,
      position: { row: 5, col: 0 },
      onSelect: () => this.scene.start("ModeSelectScene"),
    });

    // Add all items to navigation system
    this.navigation.addItems(navigationItems);

    // Add instructions text
    // this.add
    //   .text(width / 2, height - 50, "Use arrow keys to navigate, ENTER to select", {
    //     fontSize: "16px",
    //     fontFamily: "Monospace",
    //     color: colors.white,
    //   })
    //   .setOrigin(0.5);
  }
}
