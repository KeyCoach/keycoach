"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Setup from "./setup";
import Type from "./type";
import { useLoadMl5 } from "./use-load-ml5";
import { defaultKeyPositions } from "./hand-tracking";
import { useParams, useRouter } from "next/navigation";
import { type Test } from "@/app/lib/types";
import axios from "axios";
import { Loading } from "@/design-lib";

export default function Test() {
  const [cameraSetup, setCameraSetup] = useState(false);
  const [settingUp, setSettingUp] = useState(false);
  const [keyPositions, setKeyPositions] = useState(JSON.parse(JSON.stringify(defaultKeyPositions)));
  const [test, setTest] = useState<Test | null>(null);
  const router = useRouter();

  // Load ml5 module. Must be loaded before they open the setup page
  useLoadMl5();
  const { testId } = useParams();

  useEffect(() => {
    axios
      .get("/api/test", { params: { testId } })
      .then((res) => {
        setTest(res.data.test);
      })
      .catch((err) => {
        console.log(err);
        router.push("/404");
      });
  }, [testId, router]);

  return (
    <div>
      {settingUp ? (
        <Setup
          setCameraSetup={setCameraSetup}
          setSettingUp={setSettingUp}
          setKeyPositions={setKeyPositions}
          keyPositions={keyPositions}
        />
      ) : test ? (
        <Type
          test={test}
          keyPositions={keyPositions}
          setSettingUp={setSettingUp}
          cameraSetup={cameraSetup}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
