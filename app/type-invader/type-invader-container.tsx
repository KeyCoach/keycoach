"use client";
import dynamic from "next/dynamic";

const TypeInvader = dynamic(() => import("@/components/type-invader/TypeInvader"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function TypeInvaderWrapper() {
  return <TypeInvader />;
}
