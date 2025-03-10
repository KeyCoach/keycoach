import { LoadingSpinner, Modal } from "@/components";
import { RefObject, useEffect, useState, useRef } from "react";
import { Button } from "@/components";
import { AddNewKey, defaultKeyPositions } from "@/app/hand-tracking";
import { KeyPosition } from "@/app/lib/types";
import p5 from "p5";
import { useHandTracking } from "./hand-track-context";

export default function CameraSetupModal() {
  const { settingUp, setSettingUp } = useHandTracking();

  return (
    <Modal
      modalTitle="Set Up Camera"
      isOpen={settingUp}
      onCloseAction={() => setSettingUp(false)}
      confirmButtonAction={() => setSettingUp(false)}
      showCloseButton={false}
      maxWidth="max-w-screen-2xl"
    >
      <Setup />
    </Modal>
  );
}

function Setup() {
  const {
    setSettingUp,
    canvasRef,
    detectHands,
    setKeyPositionsSet,
    setKeyPositions,
    setDrawFunction,
    keyPositions,
    setShowVideo,
    showVideo,
    modelReady,
  } = useHandTracking();

  const keyPositionsRef = useRef(keyPositions);
  const rawKeyPositions = useRef<KeyPosition[][]>(JSON.parse(JSON.stringify(keyPositions)));

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  useEffect(() => {
    if (!showVideo) setShowVideo(true);

    setDrawFunction(() => (p: p5, capture: p5.Element) => {
      p.scale(-1, 1);
      p.image(capture, -capture.width, 0);

      // Draw red dots for the key positions
      for (const key of keyPositionsRef.current.flat()) {
        if (key.positionSet) {
          p.fill(255, 0, 0);
          p.noStroke();

          p.circle(-capture.width + key.x, key.y, 5);
        }
      }
    });
  }, [setDrawFunction, showVideo, setShowVideo]);

  useEffect(() => {
    const keyPressListener = (e: KeyboardEvent) => {
      if (invalidKey(e, keyPositionsRef)) return;
      e.preventDefault();
      const cameraDelay = 100;

      setTimeout(() => {
        detectHands.current((hands) => {
          const newKeyPositions = AddNewKey(e.code, hands, rawKeyPositions.current);
          keyPositionsRef.current = newKeyPositions; // update this ref for the draw function
          setKeyPositions(newKeyPositions); // update the state for the parent component
          sessionStorage.setItem("keyPositions", JSON.stringify(newKeyPositions));
          setKeyPositionsSet(true);
        });
      }, cameraDelay);
    };

    window.addEventListener("keydown", keyPressListener);

    return () => {
      // Cleanup
      window.removeEventListener("keydown", keyPressListener);
    };
  }, [detectHands, keyPositionsRef, rawKeyPositions, setKeyPositions, setKeyPositionsSet]);

  return (
    <div className="w-full bg-white p-6 dark:bg-slate-950">
      <div className="max-h-6xl mx-auto">
        <div className="flex gap-8">
          {/* Camera View Column */}
          <div className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="items-center, flex h-full min-h-[480px] w-full min-w-[640px] justify-center overflow-hidden rounded-lg">
              <div ref={canvasRef} className={modelReady ? "" : "hidden"}></div>
              {!modelReady && (
                <div className="flex flex-col items-center justify-center">
                  <LoadingSpinner />
                  <div className="mt-3">Setting up camera... This may take a minute.</div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions Column */}
          <div className="w-full max-w-[26rem] rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-50">
              Setup Instructions
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              {/* Dropdown sections */}
              <div className="border-b border-slate-200 pb-2 dark:border-slate-700">
                <button
                  onClick={() => toggleDropdown("mirror")}
                  className="flex w-full items-center justify-between text-left font-medium"
                >
                  Mirror Placement
                  <svg
                    className={`h-5 w-5 transition-transform ${openDropdown === "mirror" ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {openDropdown === "mirror" && (
                  <p className="text-md mt-2 text-slate-600 dark:text-slate-400">
                    Place adjustable mirror on your computer camera to capture your keyboard fully.
                  </p>
                )}
              </div>

              <div className="border-b border-slate-200 pb-2 dark:border-slate-700">
                <button
                  onClick={() => toggleDropdown("camera")}
                  className="flex w-full items-center justify-between text-left font-medium"
                >
                  Adjust Camera View
                  <svg
                    className={`h-5 w-5 transition-transform ${openDropdown === "camera" ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {openDropdown === "camera" && (
                  <p className="text-md mt-2 text-slate-600 dark:text-slate-400">
                    Ensure you can see all letters and punctuation on the keyboard. Line up the top
                    of your keyboard with the top of the camera view.
                  </p>
                )}
              </div>

              <div className="border-b border-slate-200 pb-2 dark:border-slate-700">
                <button
                  onClick={() => toggleDropdown("keys")}
                  className="flex w-full items-center justify-between text-left font-medium"
                >
                  Set Key Positions (Keep hand open while doing this)
                  <svg
                    className={`h-5 w-5 transition-transform ${openDropdown === "keys" ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {openDropdown === "keys" && (
                  <ul className="text-md mt-2 list-disc space-y-1 pl-4 text-slate-600 dark:text-slate-400">
                    <li>
                      With your right hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">Q</kbd>
                    </li>
                    <li>
                      With your left hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">P</kbd>
                    </li>
                    <li>
                      With your right hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">A</kbd>
                    </li>
                    <li>
                      With your left hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">L</kbd>
                    </li>
                    <li>
                      With your right hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">Z</kbd>
                    </li>
                    <li>
                      With your left hand (pointer finger): Press{" "}
                      <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-700">.</kbd>
                    </li>
                  </ul>
                )}
              </div>

              <div className="border-b border-slate-200 pb-2 dark:border-slate-700">
                <button
                  onClick={() => toggleDropdown("verify")}
                  className="flex w-full items-center justify-between text-left font-medium"
                >
                  Verify Positioning
                  <svg
                    className={`h-5 w-5 transition-transform ${openDropdown === "verify" ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {openDropdown === "verify" && (
                  <p className="text-md mt-2 text-slate-600 dark:text-slate-400">
                    Check that red dots for each key look straight and centered.
                  </p>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleDropdown("restart")}
                  className="flex w-full items-center justify-between text-left font-medium"
                >
                  Restart if Needed
                  <svg
                    className={`h-5 w-5 transition-transform ${openDropdown === "restart" ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {openDropdown === "restart" && (
                  <p className="text-md mt-2 text-slate-600 dark:text-slate-400">
                    If you make a mistake, use the "Start Over" button.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            colorTheme="amber"
            onClick={() => {
              const newKeyPositions = JSON.parse(JSON.stringify(defaultKeyPositions));
              setKeyPositions(newKeyPositions);
              keyPositionsRef.current = newKeyPositions;
              rawKeyPositions.current = newKeyPositions;
              setKeyPositionsSet(false);
              sessionStorage.removeItem("keyPositions");
            }}
          >
            Start Over
          </Button>
          <Button
            colorTheme="cerulean"
            onClick={() => {
              setSettingUp(false);
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

function invalidKey(e: KeyboardEvent, keyPositionRef: RefObject<KeyPosition[][]>) {
  if (e.ctrlKey) {
    return true;
  }
  if (!keyPositionRef.current.flat().some((key) => key.key === e.code)) {
    return true;
  }
}
