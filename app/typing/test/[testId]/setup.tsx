import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import { Button, H1 } from "@/components";
import { useHandTracking } from "@/app/hand-track-context";
import { AddNewKey, defaultKeyPositions } from "@/app/hand-tracking";
import { KeyPosition } from "@/app/lib/types";
import p5 from "p5";

export default function Setup({
  setCameraSetup,
  setSettingUp,
}: {
  setCameraSetup: Dispatch<SetStateAction<boolean>>;
  setSettingUp: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    canvasRef,
    detectHands,
    setKeyPositionsSet,
    setKeyPositions,
    setDrawFunction,
    keyPositions,
    setShowVideo,
    showVideo,
  } = useHandTracking();

  const keyPositionsRef = useRef(keyPositions);
  const rawKeyPositions = useRef<KeyPosition[][]>(JSON.parse(JSON.stringify(keyPositions)));

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
    const keyPressListener = (window.onkeydown = (e) => {
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
    });

    return () => {
      // Cleanup
      window.removeEventListener("keydown", keyPressListener);
    };
  }, [detectHands, keyPositionsRef, rawKeyPositions, setKeyPositions, setKeyPositionsSet]);

  // TODO: make this page not look like hot garbage
  return (
    <div>
      <H1>Setup Camera</H1>
      <div>
        <div ref={canvasRef}></div>

        <div>
          <Button
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
        </div>
      </div>

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

function invalidKey(e: KeyboardEvent, keyPositionRef: RefObject<KeyPosition[][]>) {
  if (e.ctrlKey) {
    return true;
  }
  if (!keyPositionRef.current.flat().some((key) => key.key === e.code)) {
    return true;
  }
}
