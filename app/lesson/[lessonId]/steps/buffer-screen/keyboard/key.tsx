import { KEYS } from "./constants/constants";
import { KeyProps } from "./types/types";

const Key: React.FC<KeyProps> = ({ keyName, width = 1, isPressed, hasBeenPressed }) => {
  const getWidthClass = (w: number): string => {
    const pixelWidth = Math.round(w * 16);
    return `w-[${pixelWidth}px]`;
  };

  const specialKeys = ["backspace", "tab", "caps lock", "enter", "left shift", "right shift"];

  let baseStyles = specialKeys.includes(keyName) ? "w-min-content " : "w-8 ";

  baseStyles =
    baseStyles +
    "h-8 m-1 flex items-center justify-center rounded-md shadow-md transition-all duration-200 font-bold text-sm select-none";

  let stateStyles = "bg-gray-800 text-white"; // never-pressed

  if (isPressed) {
    stateStyles = "bg-blue-500 text-white"; // currently-pressed
  } else if (hasBeenPressed) {
    stateStyles = "bg-white text-gray-800"; // was-pressed
  }

  return (
    <div className={`${baseStyles} ${getWidthClass(width)} ${stateStyles}`}>
      {KEYS[keyName]?.name || keyName}
    </div>
  );
};

export default Key;
