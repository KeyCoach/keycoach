import { Link } from "@/components/link";
import { H1 } from "@/components";
import { Button } from "@/components";
import Image from "next/image";

export default function Home() {
  const numDots = Math.floor(Math.random() * 25) + 45;
  return (
    <div className="h-page relative bg-gradient-to-b from-cerulean-800 to-cerulean-500">
      {/* Stars */}

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: numDots }).map((_, i) => {
          const starSize = (Math.random() * 4 + 2).toFixed(2);

          return (
            <div
              key={i}
              className={`blink absolute animate-pulse rounded-full bg-white opacity-80`}
              style={{
                animationDuration: `${(Math.random() * 2 + 1).toFixed(2)}s`,
                animationDelay: `${(Math.random() * 8).toFixed(2)}s`,
                width: `${starSize}px`,
                height: `${starSize}px`,
                top: `${(Math.random() * 100).toFixed(2)}%`,
                left: `${(Math.random() * 100).toFixed(2)}%`,
              }}
            ></div>
          );
        })}
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
              <Link className="text-slate-50 no-underline" href="/typing/test">
                <Button className="w-56" colorTheme="ceruleanLight">
                  Test my Speed
                </Button>
              </Link>

              <Link className="text-slate-50 no-underline" href="/lesson">
                <Button className="w-56" colorTheme="ceruleanLight">
                  Try a Lesson
                </Button>
              </Link>

              <Link className="text-slate-50 no-underline" href="/type-invader">
                <Button className="w-56" colorTheme="ceruleanLight">
                  Play Type Invaders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline */}
      <div className="absolute bottom-0 left-0 flex w-full flex-col">
        <Image
          src="/img/skyline3.png"
          alt="Skyline"
          width={1920}
          height={600}
          className="block h-[412px] w-full object-cover"
          priority
        />
        <div className="flex justify-center bg-black pb-4">
          <Link href="/privacy" linkVariant="navbar-link">
            <span className="text-slate-50">View our Privacy Policy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
