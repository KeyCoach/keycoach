"use client";
import Image from "next/image";
import { useHandTracking } from "./hand-track-context";

export default function CameraWarning() {
  const { cameraActivated } = useHandTracking();
  if (!cameraActivated) {
    return;
  }
  function ShutOffCamera() {
    localStorage.setItem("cameraActivated", "false");
    window.location.reload();
  }
  return (
    <div className="fixed bottom-0 end-0">
      <div className="p-5">
        <div
          className="flex h-[4rem] w-[4rem] cursor-pointer items-center overflow-hidden rounded-lg bg-slate-100 shadow transition-all duration-1000 hover:w-[24rem] dark:bg-slate-900"
          onClick={ShutOffCamera}
        >
          <div className="relative">
            <Image
              className="inline-block min-h-[4rem] min-w-[4rem] p-2"
              src="/img/camera.png"
              alt="camera icon"
              width={100}
              height={100}
            />
            <div className="pulse-red absolute left-[0.8rem] top-[1.37rem] h-[.2rem] w-[.2rem] rounded-full bg-red-500">
              {" "}
            </div>
          </div>

          <div className="min-w-[20rem] px-2 text-sm leading-tight">
            Your privacy is important to us! You can turn off the camera at any time by clicking
            here.
          </div>
        </div>
      </div>
    </div>
  );
}
