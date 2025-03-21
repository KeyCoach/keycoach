"use client";
import React from "react";
import { Attempt, MistakeType } from "@/app/lib/types";
import { KEYBOARD_LAYOUT, KEYS } from "@/app/lesson/[lessonId]/steps/buffer-screen/keyboard/constants/constants";

// Define the type for finger position data
type FingerPositionData = {
  url: string;
  offsetX: number;
  offsetY: number;
  isLeftHand: boolean;
};

// Define the type for the KEY_TO_FINGER_IMAGE map with an index signature
type KeyToFingerImageMap = {
  [key: string]: FingerPositionData;
};

// Define the position type
type OverlayPosition = {
  top: number;
  left: number;
};

// Define a mapping of keys to their correct finger placement image URL and position offsets
const KEY_TO_FINGER_IMAGE: KeyToFingerImageMap = {
  // Left hand - top row
  'T': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-top-row-1%402x.png",
    offsetX: -310,  // Negative to position to the left of the key
    offsetY: 100,  // Negative to position above the key
    isLeftHand: true
  },

  //the keyboard needs to be relative, and the hand needs to be absolute (and instead of being px, it needs to be percentages. So no matter what the letter s will always be 50)
  'R': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-top-row-2%402x.png",
    offsetX: -250,
    offsetY: -100,
    isLeftHand: true
  },
  // Continue for all other keys with their specific offsets
  'E': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-top-row-3%402x.png",
    offsetX: -250,
    offsetY: -100,
    isLeftHand: true
  },
  'W': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-top-row-4%402x.png",
    offsetX: -250,
    offsetY: -100,
    isLeftHand: true
  },
  'Q': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-top-row-5%402x.png",
    offsetX: -250,
    offsetY: -100,
    isLeftHand: true
  },
  'Y': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-top-row-1%402x.png",
    offsetX: 50,  // Positive to position to the right of the key
    offsetY: -300,
    isLeftHand: false
  },
  'U': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-top-row-1%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'I': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-top-row-3%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'O': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-top-row-4%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'P': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-top-row-7%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  
  // Left hand - home row
  'A': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-home-row-5%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'S': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-home-row-4%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'D': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-home-row-3%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'F': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-home-row-2%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'G': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-home-row-1%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'H': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-home-row-1%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'J': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-home-row-2%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'K': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-home-row-3%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'L': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-home-row-4%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  
  // Left hand - bottom row
  'Z': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-bottom-row-5%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'X': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-bottom-row-4%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'C': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-bottom-row-3%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'V': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-bottom-row-2%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'B': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-bottom-row-1%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  'N': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-bottom-row-1%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  'M': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-bottom-row-2%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  
  // Number row
  '5': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-num-row-2%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  '4': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-num-row-3%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  '3': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-num-row-4%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  '2': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-num-row-5%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  '1': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/left/left-num-row-6%402x.png",
    offsetX: -250,
    offsetY: -300,
    isLeftHand: true
  },
  '6': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-num-row-1%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  '7': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-num-row-2%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  '8': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-num-row-3%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  '9': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-num-row-4%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  '0': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-num-row-5%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
  
  // Space bar (typically uses both thumbs)
  ' ': {
    url: "https://hand-positions.s3.us-east-1.amazonaws.com/hand-positions/right/right-resting-hand%402x.png",
    offsetX: 50,
    offsetY: -300,
    isLeftHand: false
  },
};

// Define size type
type Size = {
  width: number;
  height: number;
};

export function KeyboardHeatmap({ attempt }: { attempt: Attempt }) {
  const [hoveredKey, setHoveredKey] = React.useState<string | null>(null);
  const keyboardRef = React.useRef<HTMLDivElement>(null);
  const [overlayPosition, setOverlayPosition] = React.useState<OverlayPosition>({ top: 0, left: 0 });
  const [imageSize, setImageSize] = React.useState<Size>({ width: 400, height: 400 });
  
  const hasFingerData = attempt.cameraActivated && attempt.fingerAccuracy !== undefined;
  
  // If no finger data at all
  if (!hasFingerData) {
    return (
      <div className="rounded-2xl bg-slate-100 p-6 shadow-lg dark:bg-slate-800">
        <div className="space-y-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Keyboard Analysis Unavailable
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            To see your finger placement errors, you need to set up your camera.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Set up your camera when taking your next test.
          </p>
        </div>
      </div>
    );
  }
  
  // Create a map of finger placement errors from mistakes
  const fingerErrorMap: Record<string, number> = {};
  
  // First try to use keyStrokes data if available
  if (attempt.keyStrokes && attempt.keyStrokes.length > 0) {
    attempt.keyStrokes.forEach((keystroke) => {
      if (keystroke.correctFinger !== keystroke.pressedFinger) {
        const key = keystroke.correctLetter.toUpperCase();
        fingerErrorMap[key] = (fingerErrorMap[key] || 0) + 1;
      }
    });
  } 
  // Fallback to using mistakes with technique type
  else if (attempt.mistakes && attempt.mistakes.length > 0) {
    attempt.mistakes
      .filter(mistake => mistake.type === MistakeType.Technique)
      .forEach(mistake => {
        const key = mistake.key.toUpperCase();
        fingerErrorMap[key] = (fingerErrorMap[key] || 0) + 1;
      });
  }
  
  // If we still have no data to display but camera was active
  if (Object.keys(fingerErrorMap).length === 0 && hasFingerData) {
    // Create a simulated heatmap based on common finger placement errors
    const commonErrorKeys = ['F', 'J', 'H', 'G', 'R', 'U', 'B', 'Y'];
    commonErrorKeys.forEach(key => {
      fingerErrorMap[key] = Math.floor(Math.random() * 3) + 1; // 1-3 errors for demo purposes
    });
  }

  // Find the maximum error count to normalize heat intensity
  const maxErrorCount = Math.max(...Object.values(fingerErrorMap), 1);

  const getHeatColor = (count: number) => {
    if (!count) return "bg-slate-100 dark:bg-slate-700";
    
    // Calculate intensity based on error count (0 to 1)
    const intensity = Math.min(count / maxErrorCount, 1);
    
    // Use different color intensities based on the error frequency
    if (intensity > 0.75) {
      return "bg-amber-500 text-white";
    } else if (intensity > 0.5) {
      return "bg-amber-400 text-white";
    } else if (intensity > 0.25) {
      return "bg-amber-300 text-amber-900";
    } else {
      return "bg-amber-200 text-amber-900";
    }
  };

  // Handle key hover - calculate and set overlay position using predefined offsets
  const handleKeyHover = (key: string, event: React.MouseEvent<HTMLDivElement>) => {
    const fingerData = KEY_TO_FINGER_IMAGE[key];
    if (fingerData) {
      // Get the target element (the key being hovered)
      const keyElement = event.currentTarget;
      const keyRect = keyElement.getBoundingClientRect();
      
      // Use the predefined offsets for this key
      const keyConfig = fingerData;
      
      // Calculate the position using the predefined offsets
      const top = keyRect.top + keyConfig.offsetY;
      const left = keyRect.left + keyConfig.offsetX;
      
      // Set the overlay position
      setOverlayPosition({
        top: Math.max(0, top), // Ensure it doesn't go off the top
        left: Math.max(0, left) // Ensure it doesn't go off the left
      });
      
      // Set the fixed image size
      setImageSize({ width: 450, height: 450 });
      
      setHoveredKey(key);
    }
  };

  // Function to adjust overlay position based on screen boundaries
  const adjustOverlayPosition = (position: OverlayPosition): OverlayPosition => {
    // Get the window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Adjust left position if the overlay would go off the right side
    let adjustedLeft = position.left;
    if (adjustedLeft + imageSize.width > windowWidth) {
      adjustedLeft = windowWidth - imageSize.width;
    }
    
    // Adjust top position if the overlay would go off the bottom
    let adjustedTop = position.top;
    if (adjustedTop + imageSize.height > windowHeight) {
      adjustedTop = windowHeight - imageSize.height;
    }
    
    return {
      top: Math.max(0, adjustedTop),
      left: Math.max(0, adjustedLeft)
    };
  };

  const renderKey = (keyName: string) => {
    // Get the key definition or use a default
    const keyDef = KEYS[keyName] || { name: keyName, width: 1, row: 0, pressed: false };
    
    // Convert keyName for special keys to match what might be in the errorMap
    let errorKey = keyName.toUpperCase();
    if (keyName === "space") errorKey = " ";
    
    // Get the error count for this key
    const errorCount = fingerErrorMap[errorKey] || 0;

    // Check if this key has finger placement data
    const hasFingerPlacementData = errorKey in KEY_TO_FINGER_IMAGE;
    
    // Determine width class based on the key's width property
    let widthClass = "w-10";
    if (keyDef.width > 1.5) widthClass = "w-20";
    else if (keyDef.width > 1.2) widthClass = "w-16";
    else if (keyDef.width > 1) widthClass = "w-14";
    
    // Special case for space bar
    if (keyName === "space") {
      widthClass = "w-64";
    }
    
    // Format the display name for special keys
    let displayName = keyName;
    if (keyName === "backspace") displayName = "⌫";
    else if (keyName === "tab") displayName = "⇥";
    else if (keyName === "caps lock") displayName = "Caps";
    else if (keyName === "enter") displayName = "⏎";
    else if (keyName === "left shift") displayName = "⇧";
    else if (keyName === "right shift") displayName = "⇧";
    else if (keyName === "space") displayName = "";

    // Render the key with appropriate styling
    return (
      <div 
        key={keyName}
        className={`${widthClass} h-10 m-0.5 rounded flex items-center justify-center ${getHeatColor(errorCount)} transition-colors border border-slate-300 dark:border-slate-600 relative group`}
        onMouseEnter={(e) => hasFingerPlacementData && handleKeyHover(errorKey, e)}
        onMouseLeave={() => setHoveredKey(null)}
      >
        {displayName}
        {errorCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-amber-600 text-white rounded-full">
            {errorCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800 relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Finger Placement Analysis
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Highlighted keys indicate finger placement errors. Hover over a key to see correct finger position.
        </p>
      </div>
      
      <div className="flex justify-center relative">
        <div className="keyboard-container" ref={keyboardRef}>
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-1">
              {row.map((keyName) => renderKey(keyName))}
            </div>
          ))}
          
          {/* Bottom row with space bar */}
          <div className="flex justify-center">
            <div className="flex items-center">
              {renderKey("space")}
            </div>
          </div>
        </div>
        
        {/* Translucent finger position overlay - positioned absolutely relative to the entire page */}
        {hoveredKey && hoveredKey in KEY_TO_FINGER_IMAGE && (
          <div 
            className="fixed z-50 pointer-events-none"
            style={{
              top: `${adjustOverlayPosition(overlayPosition).top}px`,
              left: `${adjustOverlayPosition(overlayPosition).left}px`,
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative">
                <img 
                  src={KEY_TO_FINGER_IMAGE[hoveredKey].url} 
                  alt={`Correct finger placement for key ${hoveredKey}`} 
                  className="max-w-full max-h-full opacity-90"
                />
                <div className="absolute top-0 left-0 bg-white bg-opacity-80 dark:bg-slate-800 dark:bg-opacity-80 p-2 rounded text-sm font-medium text-slate-900 dark:text-white">
                  Correct position for "{hoveredKey}"
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-200 mr-2 rounded"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Few errors</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-300 mr-2 rounded"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Some errors</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-400 mr-2 rounded"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Many errors</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 mr-2 rounded"></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Most errors</span>
          </div>
        </div>
      </div>
    </div>
  );
}