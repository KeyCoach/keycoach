"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Setup from "./setup";
import Type from "./type";
import { useParams, useRouter } from "next/navigation";
import { type Test } from "@/app/lib/types";
import axios from "axios";
import { LoadingPage } from "@/components";
import { useHandTracking } from "@/app/hand-track-context";

export default function Test() {
  const router = useRouter();
  const { testId } = useParams();
  const [settingUp, setSettingUp] = useState(false);
  const [cameraSetup, setCameraSetup] = useState(false);
  const [test, setTest] = useState<Test | null>(null);
  const { modelReady, setCameraActivated } = useHandTracking();

  useEffect(() => {
    console.log("fetching test");
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

  useEffect(() => {
    if (settingUp || cameraSetup) {
      setCameraActivated(true);
      localStorage.setItem("cameraActivated", "true");
    }
  }, [settingUp, cameraSetup, setCameraActivated]);

  useEffect(() => {
    return () => {
      setCameraActivated(false);
      localStorage.setItem("cameraActivated", "false");
    };
  }, [setCameraActivated]);

  return settingUp ? (
    <>
      {modelReady ? (
        <Setup setCameraSetup={setCameraSetup} setSettingUp={setSettingUp} />
      ) : (
        <LoadingPage />
      )}
    </>
  ) : test ? (
    <Type test={test} setSettingUp={setSettingUp} cameraSetup={cameraSetup} />
  ) : (
    <LoadingPage />
  );
}
