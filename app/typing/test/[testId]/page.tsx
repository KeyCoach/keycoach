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
import { Loading } from "@/components";

export default function Test() {
  const [settingUp, setSettingUp] = useState(false);
  const savedKeyPositions = sessionStorage.getItem("keyPositions");
  const [cameraSetup, setCameraSetup] = useState(!!savedKeyPositions);
  const [keyPositions, setKeyPositions] = useState(
    JSON.parse(savedKeyPositions ?? JSON.stringify(defaultKeyPositions)),
  );
  const [test, setTest] = useState<Test | null>(null);
  const router = useRouter();
  const { testId } = useParams();

  useLoadMl5();

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
