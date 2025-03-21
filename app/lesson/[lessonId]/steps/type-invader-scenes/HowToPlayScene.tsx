// HowToPlayScene.tsx
import { Scene } from "phaser";
import { colors, hexadecimalColors } from "@/constants/colors";
import { KeyboardNavigation } from "@/utils/NavigationUtils";
import { themeManager } from "@/utils/type-invader-game";

export class HowToPlayScene extends Scene {
  private navigation!: KeyboardNavigation;
  private currentImageIndex: number = 0;
  private tutorialImages: Phaser.GameObjects.Image[] = [];
  private pageIndicator!: Phaser.GameObjects.Text;
  private nextButton!: Phaser.GameObjects.Text;
  private prevButton!: Phaser.GameObjects.Text;
  private totalImages: number = 6;

  constructor() {
    super({ key: "HowToPlayScene" });
  }

  preload() {
    // Preload tutorial images if not already loaded
    for (let i = 1; i <= this.totalImages; i++) {
      this.load.image(`tutorial-${i}`, `/type-invader/assets/img/tutorial/tutorial-${i}.png`);
    }
  }

  create() {
    const { width, height } = this.cameras.main;

    // Set up theme and create background
    themeManager.setScene(this);
    themeManager.createPlainBackground();
    // themeManager.createMenuBackground();

    // Initialize keyboard navigation
    this.navigation = new KeyboardNavigation(this).init();

    // Create container for tutorial images
    const imageY = height / 2;
    const imageContainer = this.add.container(width / 2, imageY);
    imageContainer.setDepth(1);

    // Load all tutorial images but only show the first one
    for (let i = 1; i <= this.totalImages; i++) {
      const image = this.add.image(0, 0, `tutorial-${i}`);

      // Scale images to fit within the screen
      const scaleFactor = Math.min(
        (width * 1.2) / image.width,
        (height * 0.8571428571) / image.height,
      );
      image.setScale(scaleFactor);

      image.setVisible(i === 1); // Only show the first image initially
      imageContainer.add(image);
      this.tutorialImages.push(image);
    }

    const currentTheme = themeManager.getCurrentTheme();

    const textColor = (currentTheme === "space" || currentTheme === "soccer") 
    ? colors.white 
    : colors.black;

    // Page indicator text (e.g., "1/6")
    this.pageIndicator = this.add
      .text(width - 80, height - 40, `${this.currentImageIndex + 1}/${this.totalImages}`, {
        fontSize: "24px",
        fontFamily: "Monospace",
        color: textColor,
      })
      .setDepth(1);

    // Previous button
    this.prevButton = this.add
      .text((width * 2) / 5, height - 30, "< Previous", {
        fontSize: "24px",
        fontFamily: "Monospace",
        color: colors.blue,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.prevButton.setColor(colors.teal))
      .on("pointerout", () => this.prevButton.setColor(colors.blue))
      .on("pointerdown", () => this.showPreviousImage());

    // Next button
    this.nextButton = this.add
      .text((width * 3) / 5, height - 30, "Next >", {
        fontSize: "24px",
        fontFamily: "Monospace",
        color: colors.blue,
      })
      .setOrigin(0.5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.nextButton.setColor(colors.teal))
      .on("pointerout", () => this.nextButton.setColor(colors.blue))
      .on("pointerdown", () => this.showNextImage());

    // Back button
    const backButton = this.add
      .text(32, height - 40, "← Back", {
        fontSize: "24px",
        fontFamily: "Monospace",
        color: textColor,
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(1)
      .on("pointerover", () => backButton.setColor(colors.green))
      .on("pointerout", () => backButton.setColor(textColor))
      .on("pointerdown", () => this.scene.start("MainMenuScene"));

    // Add keys to navigation
    this.navigation.addItems([
      {
        element: this.prevButton,
        position: { row: 0, col: 0 },
        onSelect: () => this.showPreviousImage(),
      },
      {
        element: this.nextButton,
        position: { row: 0, col: 1 },
        onSelect: () => this.showNextImage(),
      },
      {
        element: backButton,
        position: { row: 1, col: 0 },
        onSelect: () => this.scene.start("MainMenuScene"),
      },
    ]);

    // Add keyboard controls for left/right arrows
    this.input.keyboard?.on("keydown-LEFT", this.showPreviousImage, this);
    this.input.keyboard?.on("keydown-RIGHT", this.showNextImage, this);

    // Add instructions text
    // this.add
    //   .text(width / 2, height - 50, "Use arrow keys to navigate, ENTER to select", {
    //     fontSize: "16px",
    //     fontFamily: "Monospace",
    //     color: colors.white,
    //   })
    //   .setOrigin(0.5);

    // Initialize the button states
    this.updatePageIndicator();
  }

  showNextImage = () => {
    if (this.currentImageIndex < this.totalImages - 1) {
      this.tutorialImages[this.currentImageIndex].setVisible(false);
      this.currentImageIndex++;
      this.tutorialImages[this.currentImageIndex].setVisible(true);
      this.updatePageIndicator();
    }
  };

  showPreviousImage = () => {
    if (this.currentImageIndex > 0) {
      this.tutorialImages[this.currentImageIndex].setVisible(false);
      this.currentImageIndex--;
      this.tutorialImages[this.currentImageIndex].setVisible(true);
      this.updatePageIndicator();
    }
  };

  updatePageIndicator() {
    this.pageIndicator.setText(`${this.currentImageIndex + 1}/${this.totalImages}`);

    // Disable/enable navigation buttons based on current position
    if (this.currentImageIndex === 0) {
      this.prevButton.setColor(colors.gray || "#888888");
    } else {
      this.prevButton.setColor(colors.blue);
    }

    if (this.currentImageIndex === this.totalImages - 1) {
      this.nextButton.setColor(colors.gray || "#888888");
    } else {
      this.nextButton.setColor(colors.blue);
    }
  }

  shutdown() {
    // Clean up event listeners
    this.input.keyboard?.off("keydown-LEFT", this.showPreviousImage, this);
    this.input.keyboard?.off("keydown-RIGHT", this.showNextImage, this);
  }
}
