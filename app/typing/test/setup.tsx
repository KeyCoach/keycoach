import Button from "@/components/button";
import { H1 } from "@/components/headers";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import p5 from "p5";
import { KeyPosition, HandsFromTrackingResults, AddNewKey } from "./hand-tracking";
import { startVideo, showVideo } from "./p5";

export default function Setup({
  setCameraSetup,
  setSettingUp,
  setKeyPositions,
  keyPositions,
}: {
  setCameraSetup: Dispatch<SetStateAction<boolean>>;
  setSettingUp: Dispatch<SetStateAction<boolean>>;
  setKeyPositions: Dispatch<SetStateAction<KeyPosition[][]>>;
  keyPositions: KeyPosition[][];
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const keyPositionRef = useRef(keyPositions);

  useEffect(() => {
    let p: p5;
    let capture: p5.Element;
    let keyPressListener: any;

    const mainSketch = (p: p5) => {
      p.setup = () => {
        capture = startVideo(p);
        showVideo(p, canvasRef);

        keyPressListener = window.onkeydown = (e) => {
          if (!validKey(e, keyPositionRef)) return;
          const cameraDelay = 100;

          setTimeout(() => {
            // PERF: initializing the handtracking here might come with a performance cost
            window.ml5.handPose().detect(capture, (results: any) => {
              UpdateKeyPositions(results, e.code, keyPositionRef, setKeyPositions);
            });
          }, cameraDelay);
        };
      };

      p.draw = () => {
        p.image(capture, 0, 0);

        // Draw red dots for the key positions
        for (const key of keyPositionRef.current.flat()) {
          if (key.positionSet) {
            p.fill(255, 0, 0);
            p.noStroke();
            p.circle(key.x, key.y, 5);
          }
        }
      };
    };

    // Initialize the p5 sketch
    async function initializeP5() {
      const p5 = (await import("p5")).default;
      p = new p5(mainSketch);
    }

    initializeP5();

    return () => {
      // Cleanup
      window.removeEventListener("keydown", keyPressListener);
      if (capture) capture.remove();
      if (p) p.remove();
    };
  }, [setKeyPositions]);

  return (
    <div>
      <H1>Setup Camera</H1>
      <div ref={canvasRef}></div>
      <div>
        <Button
          onClick={() => {
            setCameraSetup(true);
            setSettingUp(false);
          }}
        >
          Done Setting Up
        </Button>
      </div>
    </div>
  );
}

function validKey(e: KeyboardEvent, keyPositionRef: RefObject<KeyPosition[][]>) {
  return e.ctrlKey || !keyPositionRef.current.flat().some((key) => key.key === e.code);
}

function UpdateKeyPositions(
  results: any,
  keyCode: string,
  keyPositionRef: RefObject<KeyPosition[][]>,
  setKeyPositions: Dispatch<SetStateAction<KeyPosition[][]>>,
) {
  if (results.length === 0) return;
  const hands = HandsFromTrackingResults(results);
  const newKeyPositions = AddNewKey(keyCode, hands, keyPositionRef.current);
  keyPositionRef.current = newKeyPositions; // update this ref for the draw function
  setKeyPositions(newKeyPositions); // update the state for the parent component
}
