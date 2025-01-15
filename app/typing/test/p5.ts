import p5 from "p5";
import { RefObject } from "react";

export function startVideo(p: p5) {
  const capture = p.createCapture("video");
  capture.size(640, 480);
  capture.hide();

  return capture;
}

export function showVideo(p: p5, canvasRef: RefObject<HTMLDivElement | null>) {
  const canvas = p.createCanvas(640, 480);
  while (canvasRef.current?.firstChild) {
    canvasRef.current?.removeChild(canvasRef.current.firstChild);
  }
  canvas.parent(canvasRef.current!);

  return;
}
