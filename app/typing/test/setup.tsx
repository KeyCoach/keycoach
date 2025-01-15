import Button from "@/components/button";
import { H1 } from "@/components/headers";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import p5 from "p5";
import { KeyPosition, ProcessHandTrackingResults } from "./keyboardUtils";

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
  const keyPosRef = useRef(keyPositions);

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
          if (!keyPosRef.current.flat().some((key) => key.key === e.code)) return;

          function KeyPressHandler() {
            handPose.detect(capture, (results: any) => {
              if (results.length === 0) return;
              hands = ProcessHandTrackingResults(results);
              const newKeyPositions = UpdateKeyPositions(e.code, hands, keyPosRef.current);
              keyPosRef.current = newKeyPositions; // update this ref for the draw function
              setKeyPositions(newKeyPositions); // update the state for the parent component
            });
          }

          setTimeout(KeyPressHandler, cameraDelay); // sync the camera with the key press
        };
      };

      p.draw = () => {
        p.image(capture, 0, 0);

        // Draw red dots for the key positions
        for (const key of keyPosRef.current.flat()) {
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
      <div ref={canvasRef}></div>
      <H1>Setup Camera</H1>
      <div>
        <Button
          onClick={() => {
            setCameraSetup(true);
            setSettingUp(false);
          }}
        >
          done setting up
        </Button>
      </div>
    </div>
  );
}

function UpdateKeyPositions(keyCode: string, hands: any, keyPositions: KeyPosition[][]) {
  // Update the key positions with the new hand positions
  for (const row of keyPositions) {
    for (const key of row) {
      if (key.key === keyCode) {
        key.x = hands.l_index?.x ?? hands.r_index?.x;
        key.y = hands.l_index?.y ?? hands.r_index?.y;
        key.positionSet = true;
      }
    }
  }

  // Extrapolate the rest of the key positions
  const trendLines = CalculateTrendLines(keyPositions);
  return CalculateTunedKeyPositions(keyPositions, trendLines);
}

// Linear regression for each row
function CalculateTrendLines(keyPositions: KeyPosition[][]) {
  const regressionResults = [];
  for (const row of keyPositions.slice(0, 5)) {
    let xSum = 0;
    let ySum = 0;
    let xSquaredSum = 0;
    let xySum = 0;
    let keyCount = 0;
    for (const key of row) {
      if (key.x === 0 && key.y === 0) continue;
      keyCount++;
      xSum += key.x;
      ySum += key.y;
      xSquaredSum += key.x ** 2;
      xySum += key.x * key.y;
    }
    const slope = (keyCount * xySum - xSum * ySum) / (keyCount * xSquaredSum - xSum ** 2);
    const yIntercept = (ySum - slope * xSum) / keyCount;
    regressionResults.push([yIntercept, slope]);
  }
  return regressionResults;
}

// TODO:
// Throw an error if trend Lines aren't roughly parallel
// Throw an eror if the horizonal key spacing (between keys) is inconsistent
// Throw an eror if the vertical key spacing (between rows) is inconsistent
// Throw an error if the sides of the keyboard are not roughly parallel
// Throw an error if keys are out of order
// Throw an error if their palm is visible?
function CalculateTunedKeyPositions(keyPositions: KeyPosition[][], trendLines: number[][]) {
  // Fit the key positions to the trend lines calculated in the regression
  const fittedKeyPositions = FitKeyPositions(keyPositions, trendLines);
  const spacedKeyPositions = SpaceKeyPositions(fittedKeyPositions);
  return spacedKeyPositions;
}

// Fit the key positions to the trend lines
function FitKeyPositions(keyPositions: KeyPosition[][], trendLines: number[][]): KeyPosition[][] {
  const fittedKeyPositions = [];

  for (let rowNum = 0; rowNum < 5; rowNum++) {
    fittedKeyPositions[rowNum] = [];
    const row = keyPositions[rowNum];
    const [yIntercept, slope] = trendLines[rowNum];
    if (Number.isNaN(yIntercept) || Number.isNaN(slope)) {
      fittedKeyPositions[rowNum] = [...row];
      continue;
    }
    for (let keyNum = 0; keyNum < row.length; keyNum++) {
      const key = row[keyNum];
      const [x, y] = GetClosestPointOnLine(key.x, key.y, slope, yIntercept);
      fittedKeyPositions[rowNum][keyNum] = { ...key, x, y };
    }
  }

  return fittedKeyPositions;
}

function GetClosestPointOnLine(x1: number, y1: number, m: number, b: number) {
  const x = (y1 + x1 / m - b) / (m + 1 / m);
  const y = m * x + b;
  return [x, y];
}

// Space the keys evenly between the first and last key
function SpaceKeyPositions(fittedKeyPositions: KeyPosition[][]): KeyPosition[][] {
  const spacedKeyPositions = [...fittedKeyPositions];
  for (let rowNum = 0; rowNum < 4; rowNum++) {
    const row = spacedKeyPositions[rowNum];
    const firstKey = row.find((key) => !key.isLongKey && key.positionSet);
    const lastKey = row.toReversed().find((key) => !key.isLongKey && key.positionSet);
    if (!firstKey || !lastKey || firstKey === lastKey) continue;
    const firstKeyIndex = row.indexOf(firstKey);
    const lastKeyIndex = row.indexOf(lastKey);
    const xDistance = lastKey.x - firstKey.x;
    const yDistance = lastKey.y - firstKey.y;
    const avgXDistance = xDistance / (lastKeyIndex - firstKeyIndex);
    const avgYDistance = yDistance / (lastKeyIndex - firstKeyIndex);
    for (const key of row) {
      if (key.isLongKey) continue;
      key.x = firstKey.x + avgXDistance * (row.indexOf(key) - row.indexOf(firstKey));
      key.y = firstKey.y + avgYDistance * (row.indexOf(key) - row.indexOf(firstKey));
      key.positionSet = true;
    }
  }
  return spacedKeyPositions;
}
