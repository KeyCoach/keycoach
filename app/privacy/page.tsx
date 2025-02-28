import { H1 } from "@/components";

export default function SamplePage() {
  return (
    <div className="w-text mx-auto mt-5">
      <H1 className="mb-3">Privacy Pledge</H1>
      <p>
        Your privacy is our top priority! When you turn your video on for hand tracking, that video
        stays on your computer and is never sent over the internet. Your computer will use th video
        to match your fingers up to the keys, but that video is never stored or sent anywhere.
      </p>
    </div>
  );
}
