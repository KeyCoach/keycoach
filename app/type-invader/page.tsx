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
    </div>
  );
}
