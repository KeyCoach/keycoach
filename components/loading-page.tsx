"use client";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { LoadingSpinner } from "./loading";

export function GetRandomIndex() {
  return Math.floor(Math.random() * sillyWaitingMessages.length);
}

export const getServerSideProps: GetServerSideProps = async () => {
  const sillyMessageIndex = GetRandomIndex();
  return {
    props: {
      sillyMessageIndex,
    },
  };
};

export function LoadingPage({ sillyMessageIndex }: { sillyMessageIndex?: number }) {
  const [messageIndex, setMessageIndex] = useState(sillyMessageIndex);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setMessageIndex(GetRandomIndex());
    const interval = setInterval(() => {
      setIsMounted(true);
      setMessageIndex(GetRandomIndex());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-page-50 flex w-full flex-col items-center justify-end">
      <div>
        <LoadingSpinner size="w-20 h-20" />
      </div>
      <div className="relative flex w-full justify-center pb-12">
        {sillyWaitingMessages.map((message, i) => (
          <div
            key={message}
            className={`${isMounted && "duration-1000"} ${isMounted && messageIndex === i && "delay-700"} absolute mt-4 flex text-xl font-bold text-blue-500 transition-all ${messageIndex === i ? "opacity-100" : "opacity-0"}`}
          >
            <div className="mx-2 animate-bounce">⏳</div>
            {message}...
            <div className="mx-2 animate-bounce">⏳</div>
          </div>
        ))}
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
];
