"use client";
import { Link } from "@/components/link";
import { H1 } from "@/components";
import { Button } from "@/components";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { FC } from "react";
import { Stars } from "@/components/stars-background";

interface TypingEffectProps {
  titles: string[];
}

const TypingEffect: FC<TypingEffectProps> = ({ titles }) => {
  const [displayText, setDisplayText] = useState(titles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [delta, setDelta] = useState(200);

  const currentTitleRef = useRef(titles[0]);

  useEffect(() => {
    const ticker = () => {
      const currentTitle = isDeleting ? currentTitleRef.current : titles[titleIndex];

      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
        setDelta(50);
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setDelta(150);
      }

      const randomDeletionDelay = Math.random() * 1000 + 2000;

      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), randomDeletionDelay);
      } else if (isDeleting && displayText === "") {
        setTimeout(() => {
          setIsDeleting(false);
          currentTitleRef.current = titles[titleIndex];
          setTitleIndex((titleIndex + 1) % titles.length);
        }, randomDeletionDelay);
      }
    };

    const timer = setTimeout(ticker, delta);
    return () => clearTimeout(timer);
  }, [displayText, delta, isDeleting, titleIndex, titles]);

  return (
    <>
      <span className="inline-block">{displayText}</span>
      <span className="blink inline-block align-text-top">|</span>
    </>
  );
};

export default function Home(): React.ReactNode {
  const numDots = useMemo(() => Math.floor(Math.random() * 25) + 45, []);

  const homePageTitle = "Learn to type with KeyCoach!";
  const alternateTitles = [
    "Type faster with KeyCoach!",
    "Improve your technique with KeyCoach!",
    "Improve your WPM with KeyCoach!",
    "Impress your friends with KeyCoach!",
    "Master keyboard skills with KeyCoach!",
  ];

  const allTitles = [homePageTitle, ...alternateTitles];

  return (
    <div className="h-page relative bg-gradient-to-b from-cerulean-800 to-cerulean-500">
      {/* Content */}
      <Stars numDots={numDots} />
      <div className="relative z-10 flex flex-col items-center px-4 pt-52 text-center">
        <div className="w-full">
          <H1 className="relative mb-20 text-5xl font-bold text-slate-50">
            <TypingEffect titles={allTitles} />
          </H1>

          <div className="space-y-8">
            <div className="flex justify-center space-x-8">
              <Button className="w-56" colorTheme="ceruleanLight" href="/typing/test">
                Test my Speed
              </Button>

              <Button className="w-56" colorTheme="ceruleanLight" href="/lesson">
                Try a Lesson
              </Button>

              <Button className="w-56" colorTheme="ceruleanLight" href="/type-invader">
                Play Type Invaders
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline */}
      <div className="absolute bottom-0 left-0 flex w-full flex-col">
        <Image
          src="/img/skyline3.png"
          alt="Skyline"
          unoptimized={true}
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
