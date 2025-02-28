"use client";

import { useEffect, useState } from "react";
import { H3 } from "./headers";

export function LoadingSpinner({ size = "w-10 h-10", className = "" }) {
  return (
    <div
      className={`${size} inline-block animate-spin rounded-full border-4 border-blue-500 border-t-transparent ${className}`}
    ></div>
  );
}

export function LoadingPage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((messageIndex + 1) % sillyWaitingMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <div className="h-page flex flex-col items-center justify-center">
      <div>
        <LoadingSpinner size="w-20 h-20" />
      </div>
      <div className="relative flex w-full justify-center pb-12">
        {sillyWaitingMessages.map((message, i) => (
          <div
            key={message}
            className={`absolute mt-4 flex text-xl font-bold text-blue-500 transition-all delay-1000 duration-1000 ${messageIndex === i ? "opacity-100" : "opacity-0"}`}
          >
            <div className="mx-2 animate-spin">⏳</div>
            {message}...
            <div className="mx-2 animate-spin">⏳</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingOverlay({ show = true, message = "Loading" }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex animate-modalBackground items-center justify-center bg-slate-500 bg-opacity-40">
      <div className="min-w-80 max-w-md animate-fadeInUp rounded-lg bg-[#556c] p-10 shadow-lg">
        <div className="text-center">
          <H3 className="pb-5">{message}</H3>
          <div>
            <LoadingSpinner size="w-20 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

const sillyWaitingMessages = [
  "Making a sandwich",
  "Counting to infinity",
  "Reading the dictionary",
  "Filling a bucket with water",
  "Solving a Rubik's cube blindfolded",
  "Watching the clouds",
  "Sharpening pencils",
  "Listening to Nickleback",
  "Wondering why the chicken crossed the road",
  "Teaching a cat how to play fetch",
  "Catching a shooting star",
  "Hunting for treasure in the backyard",
  "Counting clouds in the sky",
  "Teaching a penguin to dance",
  "Looking for hidden rainbows",
  "Chasing butterflies through a field",
  "Waiting for a smile to appear",
  "Planting seeds of happiness",
  "Reading the world’s most interesting book",
  "Building a castle from marshmallows",
  "Looking for the perfect pebble",
  "Building a boat out of paper",
  "Whistling with the birds",
  "Listening to the song of the trees",
  "Finding magic in the ordinary",
  "Looking for hidden treasure in your backyard",
  "Trying to fold a fitted sheet",
  "Finding the perfect skipping rock",
  "Downloading the Halo update",
  "Organizing the junk drawer",
  "Waiting for the elevator",
  "Folding a paper airplane",
  "Finding coins in the couch",
].sort(() => Math.random() - 0.5);
