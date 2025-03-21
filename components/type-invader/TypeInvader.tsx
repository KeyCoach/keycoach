// components/type-invader/TypeInvader.tsx
import { useEffect, useRef, useState } from "react";
import createGame from "@/utils/type-invader-game";
import { KeyPosition, handposeCallback, Letter, MistakeType } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import { Dispatch, SetStateAction, RefObject } from "react";

interface TypeInvaderProps {
  cameraActivated: boolean;
  keyPositions: KeyPosition[][];
  detectHands: RefObject<handposeCallback>;
  setFingerAccuracy: Dispatch<SetStateAction<number>>;
}

export default function TypeInvader({
  cameraActivated,
  keyPositions,
  detectHands,
  setFingerAccuracy
}: TypeInvaderProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [keyPresses, setKeyPresses] = useState<any[]>([]);
  const [correctFingerCount, setCorrectFingerCount] = useState(0);
  const [totalKeyCount, setTotalKeyCount] = useState(0);

  // Format key positions for easier access
  const formattedKeyPositionsRef = useRef<Record<string, KeyPosition>>({});

  useEffect(() => {
    const formattedKeyPositions: Record<string, KeyPosition> = {};
    for (const row of keyPositions) {
      for (const key of row) {
        formattedKeyPositions[key.key] = key;
      }
    }
    formattedKeyPositionsRef.current = formattedKeyPositions;
  }, [keyPositions]);

  // Update finger accuracy in window object for Phaser game
  useEffect(() => {
    // Make finger accuracy available to the Phaser game
    (window as any).typeInvaderFingerAccuracy =
      correctFingerCount > 0 ? (correctFingerCount / totalKeyCount) * 100 : 100;
  }, [correctFingerCount, totalKeyCount]);

  // Initialize game
  useEffect(() => {
    if (!gameRef.current) {
      const game = createGame();
      gameRef.current = game;
    }

    if (cameraActivated) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Skip if key isn't relevant
        if (e.code === 'Escape' || e.code === 'Tab') return;

        const id = uuidv4();
        const timeSinceStart = Date.now();

        // Increment total key count immediately
        setTotalKeyCount(prev => {
          const newTotal = prev + 1;
          return newTotal;
        });

        setTimeout(() => {
          if (detectHands.current) {
            detectHands.current((hands) => {
              // Process finger position
              const wasCorrectFinger = processFingerPosition(
                e.key,
                e.code,
                id,
                hands,
                formattedKeyPositionsRef.current,
                timeSinceStart
              );

              // Update correct finger count based on result
              setCorrectFingerCount(prev => {
                const newCount = wasCorrectFinger ? prev + 1 : prev;

                // Calculate and update finger accuracy
                const totalKeys = totalKeyCount + 1; // Add 1 since state might not be updated yet
                const accuracy = (newCount / totalKeys) * 100;

                // Important: Update both the React state and window global
                setFingerAccuracy(accuracy);
                (window as any).typeInvaderFingerAccuracy = accuracy;

                return newCount;
              });
            });
          }
        }, 120);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [cameraActivated, detectHands, setFingerAccuracy, totalKeyCount]);

  useEffect(() => {
    // Let the game know if camera tracking is active
    (window as any).typeInvaderCameraActive = cameraActivated;

    return () => {
      // Clean up when component unmounts
      (window as any).typeInvaderCameraActive = false;
    };
  }, [cameraActivated]);

  // Process finger position logic
  const processFingerPosition = (
    key: string,
    keyCode: string,
    inputId: string,
    hands: any,
    keyPositions: Record<string, KeyPosition>,
    timeSinceStart: number
  ) => {
    // Early exit if key position isn't set up or hands aren't detected
    if (!keyPositions[keyCode] || !keyPositions[keyCode].positionSet) {
      console.log("Key position not set for:", keyCode);
      return false;
    }

    // If no hands detected, return false
    if (!hands.l_index && !hands.r_index) {
      console.log("No hands detected");
      return false;
    }

    const fingerDistances: Record<string, number> = {};

    // Calculate distances for each finger
    Object.entries(hands).forEach(([finger_name, finger_coords]: [string, any]) => {
      if (!finger_coords) return;
      const distance = Math.sqrt(
        (finger_coords.x - keyPositions[keyCode].x) ** 2 +
        (finger_coords.y - keyPositions[keyCode].y) ** 2,
      );
      fingerDistances[finger_name] = distance;
    });

    // Handle edge case - check if KeyF and KeyG are properly set
    if (!keyPositions["KeyF"] || !keyPositions["KeyG"] ||
      !keyPositions["KeyF"].positionSet || !keyPositions["KeyG"].positionSet) {
      console.log("KeyF or KeyG not properly set for distance calculation");
      return false;
    }

    const correctFingers = keyPositions[keyCode].correctFingers;

    // Checking if correct finger was used
    const fCoords = keyPositions["KeyF"];
    const gCoords = keyPositions["KeyG"];
    const keyDistance = Math.sqrt((fCoords.x - gCoords.x) ** 2 + (fCoords.y - gCoords.y) ** 2);

    // Check if any correct finger is close enough to the key
    const usedCorrectFinger = correctFingers.some(
      (fingerName) => {
        const isClose = fingerDistances[fingerName] && fingerDistances[fingerName] < keyDistance * 1.2;
        console.log(`Checking finger ${fingerName}: distance=${fingerDistances[fingerName]}, threshold=${keyDistance * 1.2}, isClose=${isClose}`);
        return isClose;
      }
    );

    console.log("Used correct finger:", usedCorrectFinger, "for key:", keyCode);

    if (!usedCorrectFinger) {
      setMistakes((prev) => [
        ...prev,
        {
          key,
          time: timeSinceStart,
          type: MistakeType.Technique,
        },
      ]);
    }

    return usedCorrectFinger;
  };

  return <div id="game-container" />;
}