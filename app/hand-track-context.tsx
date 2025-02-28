"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { showVideo as setVideoVisible, startVideo } from "./p5";
import { defaultKeyPositions, HandsFromTrackingResults } from "./hand-tracking";
import { handposeCallback, Hands, HandTrackContextType } from "./lib/types";
import p5Types from "p5";

// loads ml5 onto the Window Object
declare global {
  interface Window {
    ml5: any;
  }
}

export function useHandTracking() {
  const context = useContext(HandTrackContext);
  if (!context) {
    throw new Error("useHandTrack must be used within a HandTrackProvider");
  }
  return context as HandTrackContextType;
}

const HandTrackContext = createContext({});

export function HandTrackProvider({ children }: { children: React.ReactNode }) {
  const [cameraActivated, setCameraActivated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [keyPositionsSet, setKeyPositionsSet] = useState(false);
  const [keyPositions, setKeyPositions] = useState(JSON.parse(JSON.stringify(defaultKeyPositions)));
  const [drawFunction, setDrawFunction] = useState<(p: p5Types, capture: p5Types.Element) => void>(
    () => {},
  );

  const { modelReady, canvasRef, detectHands } = useSetupCamera(
    cameraActivated,
    showVideo,
    drawFunction,
  );

  const data: HandTrackContextType = {
    showVideo,
    keyPositionsSet,
    setKeyPositionsSet,
    modelReady,
    canvasRef,
    detectHands,
    cameraActivated,
    setCameraActivated,
    setShowVideo,
    setDrawFunction,
    keyPositions,
    setKeyPositions,
  };

  useEffect(() => {
    const savedKeyPositions = sessionStorage.getItem("keyPositions");
    const cameraActivated = sessionStorage.getItem("cameraActivated");
    if (savedKeyPositions) {
      setKeyPositions(JSON.parse(savedKeyPositions));
      setKeyPositionsSet(true);
    }
    if (cameraActivated) {
      setCameraActivated(true);
    }
  }, []);

  return <HandTrackContext.Provider value={data}>{children}</HandTrackContext.Provider>;
}

function useSetupCamera(
  trackingActive: boolean,
  showVideo: boolean,
  drawFunction?: (p: p5Types, capture: p5Types.Element) => void,
) {
  drawFunction = drawFunction ?? (() => {});
  drawFunction = useCallback(drawFunction, [drawFunction]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [modelReady, setModelReady] = useState(false);
  const detectHands = useRef<handposeCallback>(() => () => {});

  useEffect(() => {
    if (!trackingActive) return;
    let capture: p5Types.MediaElement;
    let p: p5Types;
    let handpose: any;

    async function loadMl5() {
      if (document.getElementById("ml5-script")) return;
      if (window.ml5) return;

      const ml5Script = document.createElement("script");
      ml5Script.src = "https://unpkg.com/ml5@1/dist/ml5.js";
      ml5Script.id = "ml5-script";
      ml5Script.async = true;
      document.head.appendChild(ml5Script);
      while (!window.ml5) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    async function loadp5() {
      const mainSketch = (p: p5Types) => {
        p.setup = async () => {
          capture = startVideo(p);
          if (showVideo) {
            if (!canvasRef.current) {
              throw new Error("Set the canvas ref if you want to show the video");
            }
            setVideoVisible(p, canvasRef, capture.width, capture.height);
          }
        };

        p.draw = () => {
          drawFunction?.(p, capture);
        };
      };

      const p5 = await import("p5").then((p5) => p5.default);
      p = new p5(mainSketch);
    }

    async function loadHandpose() {
      let success = false;
      handpose = window.ml5.handPose();

      while (!success) {
        handpose.detect(capture, () => {
          success = true;
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    async function setup() {
      const start = Date.now();

      await Promise.all([
        loadMl5().then(() => console.log(`ml5 loaded in ${Date.now() - start}ms`)),
        loadp5().then(() => console.log(`p5 loaded in ${Date.now() - start}ms`)),
      ]);

      await loadHandpose().then(() =>
        console.log(`handpose loaded, model ready in ${Date.now() - start}ms`),
      );

      detectHands.current = (callback: (hands: Hands) => void) => {
        handpose.detect(capture, (results: any) => {
          const hands = HandsFromTrackingResults(results);
          callback(hands);
        });
      };
      setModelReady(true);
    }

    setup();

    return () => {
      if (capture) {
        if (capture.elt?.srcObject) {
          capture.elt.srcObject.getTracks().forEach((track: any) => {
            track.stop();
            capture.elt.srcObject.removeTrack(track);
          });
        }
        capture.elt.srcObject = null; // Clear media stream
        capture.remove();
      }
      if (p) p.remove();
    };
  }, [trackingActive, showVideo, drawFunction]);

  return { modelReady, canvasRef, detectHands };
}
