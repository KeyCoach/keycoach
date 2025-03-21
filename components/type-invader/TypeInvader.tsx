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

      // Set up keyboard event listener to bridge Phaser and hand tracking
      if (cameraActivated) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.code && formattedKeyPositionsRef.current[e.code]) {
            const id = uuidv4();
            const timeSinceStart = Date.now();

            // Add to key presses for tracking
            setKeyPresses(prev => [...prev, { id, key: e.key, code: e.code, time: timeSinceStart }]);
            setTotalKeyCount(prev => prev + 1);

            // Process finger position with a slight delay to match camera
            setTimeout(() => {
              if (detectHands.current) {
                detectHands.current((hands) => {
                  const wasCorrectFinger = processFingerPosition(
                    e.key,
                    e.code,
                    id,
                    hands,
                    formattedKeyPositionsRef.current,
                    timeSinceStart
                  );

                  if (wasCorrectFinger) {
                    setCorrectFingerCount(prev => prev + 1);
                  }

                  // Update finger accuracy
                  const newCount = wasCorrectFinger ? correctFingerCount + 1 : correctFingerCount;
                  const newTotal = totalKeyCount + 1;
                  const accuracy = (newCount / newTotal) * 100;
                  setFingerAccuracy(accuracy);
                });
              }
            }, 120); // Match the camera delay in typing-box.tsx
          }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [cameraActivated, detectHands, setFingerAccuracy, correctFingerCount, totalKeyCount]);

  // Process finger position logic
  const processFingerPosition = (
    key: string,
    keyCode: string,
    inputId: string,
    hands: any,
    keyPositions: Record<string, KeyPosition>,
    timeSinceStart: number
  ) => {
    if (!keyPositions[keyCode]) return false;
    if (!keyPositions[keyCode].positionSet) return false;

    const fingerDistances: Record<string, number> = {};

    Object.entries(hands).forEach(([finger_name, finger_coords]: [string, any]) => {
      if (!finger_coords) return;
      const distance = Math.sqrt(
        (finger_coords.x - keyPositions[keyCode].x) ** 2 +
        (finger_coords.y - keyPositions[keyCode].y) ** 2,
      );
      fingerDistances[finger_name] = distance;
    });

    const closestFinger = { fingerName: "", distance: Infinity };
    Object.entries(fingerDistances).forEach(([fingerName, distance]) => {
      if (distance < closestFinger.distance) {
        closestFinger.fingerName = fingerName;
        closestFinger.distance = distance;
      }
    });

    if (closestFinger.fingerName === "") {
      console.error("No fingers detected");
      return false;
    }

    const correctFingers = keyPositions[keyCode].correctFingers;

    // Checking if correct finger was used (similar to UsedCorrectFinger function)
    const fCoords = keyPositions["KeyF"];
    const gCoords = keyPositions["KeyG"];
    const keyDistance = Math.sqrt((fCoords.x - gCoords.x) ** 2 + (fCoords.y - gCoords.y) ** 2);
    const usedCorrectFinger = correctFingers.some(
      (fingerName) => fingerDistances[fingerName] < keyDistance * 1.2,
    );

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