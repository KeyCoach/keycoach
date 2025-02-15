import { Link } from "@/components/link";
import { H1 } from "@/components";
import { Button } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cerulean-800 to-cerulean-500">
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-80"
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
      <div className="relative z-10 flex flex-col items-center px-4 pt-52 text-center">
        <div className="w-full max-w-3xl">
          <H1 className="relative mb-20 text-5xl font-bold text-slate-50">
            <span className="inline-block">Learn to Type with KeyCoach!</span>
            <span className="center blink inline-block align-text-top">|</span>
          </H1>

          <div className="space-y-8">
            <div className="flex justify-center space-x-8">
              <Button colorTheme="ceruleanLight">
                <Link className="block w-40 text-slate-50 no-underline" href="/typing/test">
                  Test my Speed
                </Link>
              </Button>

              <Button colorTheme="ceruleanLight">
                <Link className="block w-40 text-slate-50 no-underline" href="/lesson">
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
          className="h-[500px] w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
