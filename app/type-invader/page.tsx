"use client";

import { Stars } from "@/components/stars-background";
import TypeInvaderWrapper from "./type-invader-container";
import { HandTrackProvider, useHandTracking } from "@/app/hand-track-context";
import { Button } from "@/components";
import { useState } from "react";

export default function TypeInvaderPage() {
  const numDots = Math.floor(Math.random() * 25) + 45;
  const [fingerAccuracy, setFingerAccuracy] = useState(0);
  const { cameraActivated, setSettingUp, canvasRef } = useHandTracking();

  return (
    <HandTrackProvider>
      <div className="h-page relative">
        <Stars numDots={numDots} />
        <div className="w-text mx-auto pt-12">
          <div className="relative mb-4 flex justify-between items-center">
            <GameControls cameraActivated={cameraActivated} setSettingUp={setSettingUp} />

            <div className="rounded-lg bg-slate-800 p-2 text-slate-200">
              <span>Finger Accuracy: {fingerAccuracy.toFixed(1)}%</span>
            </div>
          </div>

          <div ref={canvasRef} className="hidden"></div>

          <div className="overflow-hidden rounded-lg shadow">
            <TypeInvaderWrapper setFingerAccuracy={setFingerAccuracy} />
          </div>
        </div>
      </div>
    </HandTrackProvider>
  );
}

function GameControls({ cameraActivated, setSettingUp }: { cameraActivated: boolean; setSettingUp: (value: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => setSettingUp(true)}>
        {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
      </Button>
    </div>
  );
}
