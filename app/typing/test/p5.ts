import p5 from "p5";
import { RefObject } from "react";

export function startVideo(p: p5, width = 640, height = 480) {
  const capture = p.createCapture("video");
  capture.size(width, height);
  capture.hide();

  return capture;
}

export function showVideo(
  p: p5,
  canvasRef: RefObject<HTMLDivElement | null>,
  width = 640,
  height = 480,
) {
  const canvas = p.createCanvas(width, height);
  while (canvasRef.current?.firstChild) {
    canvasRef.current?.removeChild(canvasRef.current.firstChild);
  }
  canvas.parent(canvasRef.current!);

  return;
}
