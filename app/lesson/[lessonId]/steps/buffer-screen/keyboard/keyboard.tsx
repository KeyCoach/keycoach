// components/Keyboard.tsx
import React, { useState, useEffect } from "react";
import Key from "./key";
import { KEYBOARD_LAYOUT, KEYS } from "./constants/constants";
import { KeyDefinition } from "./types/types";

const Keyboard: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
  const [everPressedKeys, setEverPressedKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      setPressedKeys((prev) => ({ ...prev, [key]: true }));
      setEverPressedKeys((prev) => ({ ...prev, [key]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      setPressedKeys((prev) => ({ ...prev, [key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const getKeyProps = (keyId: string): KeyDefinition => {
    return KEYS[keyId] || { name: keyId, width: 1, row: 1, pressed: false };
  };

  return (
    <div className="bg-gray-100 inline-block rounded-lg p-5 shadow-lg">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-2 flex justify-center">
          {row.map((keyId) => {
            const keyProps = getKeyProps(keyId);
            return (
              <Key
                key={keyId}
                keyName={keyId}
                width={keyProps.width}
                isPressed={pressedKeys[keyId.toUpperCase()] || false}
                hasBeenPressed={everPressedKeys[keyId.toUpperCase()] || false}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
