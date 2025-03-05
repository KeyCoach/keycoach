import { Link } from "@/components/link";
import Image from "next/image";
import TypeInvaderWrapper from "./type-invader-container";

export default function TypeInvaderPage() {
  return (
    <div className="w-text mx-auto mt-12">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute -z-10 rounded-full bg-white opacity-80"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* type invader */}
      <div className="overflow-hidden rounded-lg shadow">
        <TypeInvaderWrapper />
      </div>

      {/* skyline */}
      <div className="absolute bottom-0 left-0 -z-10 flex w-full flex-col">
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
