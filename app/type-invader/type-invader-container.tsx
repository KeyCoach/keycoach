"use client";
import { LoadingPage } from "@/components";
import dynamic from "next/dynamic";

const TypeInvader = dynamic(() => import("@/components/type-invader/TypeInvader"), {
  loading: () => <LoadingPage />,
  ssr: false,
});

export default function TypeInvaderWrapper() {
  return (
    <div className="relative">
      <TypeInvader />
    </div>
  );
}
