"use client";
import React from "react";
import { useState } from "react";
import Setup from "./setup";
import Type from "./type";
import { useLoadMl5 } from "./use-load-ml5";
import { defaultKeyPositions } from "./hand-tracking";

export default function Test() {
  const [cameraSetup, setCameraSetup] = useState(false);
  const [settingUp, setSettingUp] = useState(false);
  const [keyPositions, setKeyPositions] = useState(defaultKeyPositions);

  // Load ml5 module.must be loaded before they open the setup page
  useLoadMl5();

  return (
    <div>
      {settingUp ? (
        <Setup
          setCameraSetup={setCameraSetup}
          setSettingUp={setSettingUp}
          setKeyPositions={setKeyPositions}
          keyPositions={keyPositions}
        />
      ) : (
        <Type keyPositions={keyPositions} setSettingUp={setSettingUp} cameraSetup={cameraSetup} />
      )}
    </div>
  );
}
