import Link from "next/link";
import { H1 } from "@/components";
import { Button } from "@/components/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="absolute min-h-screen relative bg-gradient-to-b from-cerulean-800 to-cerulean-500">
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center pt-52">
        <div className="w-full max-w-3xl">
          <H1 className="text-5xl font-bold text-slate-50 mb-20 relative">
            <span className="inline-block">Learn to Type with KeyCoach!</span>
            <span className="inline-block center blink align-text-top">|</span>
          </H1>

          <div className="space-y-8">
            <div className="flex justify-center space-x-8">
              <Button colorTheme="ceruleanLight">
                <Link className="w-40 block text-slate-50 no-underline" href="/typing/test">
                  Test my Speed
                </Link>
              </Button>

              <Button colorTheme="ceruleanLight">
                <Link className="w-40 block text-slate-50 no-underline" href="/lesson">
                  Try a Lesson
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline */}
      <div className="absolute bottom-0 left-0 w-full">
      <Image
          src="/img/skyline.png"
          alt="Skyline"
          width={1920}
          height={600}
          className="w-full h-[500px] object-cover"
          priority
        />
      </div>
    </div>
  );
}