import { H2, LoadingSpinner, Modal } from "@/components";
import { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components";
import { AddNewKey, defaultKeyPositions } from "@/app/hand-tracking";
import { KeyPosition } from "@/app/lib/types";
import p5 from "p5";
import { useHandTracking } from "./hand-track-context";

export default function CameraSetupModalNew() {
  const { settingUp, setSettingUp } = useHandTracking();

  return (
    <Modal
      modalTitle="Set Up Camera"
      isOpen={true}
      onCloseAction={() => setSettingUp(false)}
      confirmButtonAction={() => setSettingUp(false)}
      showCloseButton={false}
      maxWidth="max-w-[100rem]"
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
          <div className="flex h-[35rem] items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">
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
          <SetupInstructions />
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

function SetupInstructions() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Let's Get Started!",
      directions:
        "To get feedback on your technique, you'll need to calibrate your camera so it knows where your keys are. Follow these steps to set up your camera:",
    },
    {
      title: "Place Mirror",
      vidUrl: "PlaceMirror.mp4",
      directions: "Place the mirror on your laptop in front of your camera.",
    },
    {
      title: "Set Up Camera",
      vidUrl: "AdjustMirror.mp4",
      directions:
        "Adjust the mirror so that your entire keyboard is visible. Tilt your laptop up so it sees your keyboard from above and line up the top of the video with the top of your keyboard.",
    },
    {
      title: "Calibrate Keys",
      vidUrl: "CalibrateKeys.mp4",

      directions: (
        <div>
          <p className="mb-3">
            Press on the keys to calibrate them. Follow the pattern in this video to calibrate your
            keys. Make sure your whole hand is visible in the video.
          </p>
          <p>
            With your right hand, type:
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">Q</kbd>,
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">A</kbd>,
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">Z</kbd>.
          </p>
          <p>
            With your left hand, type:
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">P</kbd>,
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">L</kbd>,
            <kbd className="ms-1 rounded bg-slate-200 px-1 dark:bg-slate-700">,</kbd>,
          </p>
        </div>
      ),
    },
    {
      title: "Troubleshooting",
      directions: (
        <div>
          Here are some common issues and how to fix them:
          <ol className="my-3 list-decimal pl-4">
            <li>
              <span className="text-lg underline">Keep your hand in full view:</span> Handtracking
              is most accurate when the camera can see your whole hand, including your wrist.
            </li>
            <li>
              <span className="text-lg underline">Lighting:</span> Make sure you have good lighting
              and avoid glare on your screen or keyboard.
            </li>
          </ol>
        </div>
      ),
    },
  ];

  function nextStep() {
    setStep((prev) => {
      if (prev === steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  }
  function prevStep() {
    setStep((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  }

  return (
    <div className="relative h-[35rem] w-[32rem] max-w-[32rem] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="w-full px-4 py-3 dark:bg-slate-600">
        <H2>{steps[step].title}</H2>
      </div>
      <hr />
      <div className="p-4">
        {steps[step].vidUrl && (
          <video
            className="h-[17rem] w-full"
            src={
              "https://typing-background-images.s3.us-east-1.amazonaws.com/videos/camera-setup/" +
              steps[step].vidUrl
            }
            title="YouTube video player"
            autoPlay
            loop
            muted
            controls
          ></video>
        )}

        <div className="mt-3 text-slate-600 dark:text-slate-300">{steps[step].directions}</div>
      </div>
      <div className="absolute bottom-0 grid w-full grid-cols-3 px-5 py-4">
        {step > 0 ? <Button onClick={prevStep}>Back</Button> : <div></div>}

        <div className="mx-auto flex items-center space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                step === index ? "bg-cerulean-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>

        {step < steps.length - 1 ? <Button onClick={nextStep}>Next</Button> : <div></div>}
      </div>
    </div>
  );
}
