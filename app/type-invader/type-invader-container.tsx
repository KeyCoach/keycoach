"use client";
import { LoadingPage } from "@/components";
import dynamic from "next/dynamic";
import { useHandTracking } from "@/app/hand-track-context";
import { Dispatch, SetStateAction } from "react";

const TypeInvader = dynamic(() => import("@/components/type-invader/TypeInvader"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

export default function TypeInvaderWrapper({ setFingerAccuracy }: { setFingerAccuracy: Dispatch<SetStateAction<number>> }) {
  const { cameraActivated, keyPositions, detectHands } = useHandTracking();

  return (
    <div className="relative">
      <TypeInvader cameraActivated={cameraActivated} keyPositions={keyPositions} detectHands={detectHands} setFingerAccuracy={setFingerAccuracy} />
    </div>
  );
}
