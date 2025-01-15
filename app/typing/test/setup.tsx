import Button from "@/components/button";
import { H1 } from "@/components/headers";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import p5 from "p5";
import { KeyPosition, HandsFromTrackingResults, UpdatedKeyPositions } from "./hand-tracking";

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
        // Open the camera and canvas. Initialize handtrack model
        const handPose = window.ml5.handPose();
        const canvas = p.createCanvas(640, 480);
        if (canvasRef.current?.firstChild) {
          canvasRef.current?.removeChild(canvasRef.current.firstChild);
        }
        canvas.parent(canvasRef.current!);
        capture = p.createCapture("video");
        const cameraDelay = 100;
        capture.size(640, 480);
        capture.hide();

        keyPressListener = window.onkeydown = (e) => {
          let hands;
          if (e.ctrlKey) return;
          if (!keyPositionRef.current.flat().some((key) => key.key === e.code)) return;

          function KeyPressHandler() {
            handPose.detect(capture, (results: any) => {
              if (results.length === 0) return;
              hands = HandsFromTrackingResults(results);
              const newKeyPositions = UpdatedKeyPositions(e.code, hands, keyPositionRef.current);
              keyPositionRef.current = newKeyPositions; // update this ref for the draw function
              setKeyPositions(newKeyPositions); // update the state for the parent component
            });
          }

          setTimeout(KeyPressHandler, cameraDelay); // sync the camera with the key press
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
