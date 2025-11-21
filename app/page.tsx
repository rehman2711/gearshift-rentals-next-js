"use client";

import { useEffect, useState } from "react";
import PorscheScene from "@/app/components/HeroBG/PorscheScene";
import WebhookTrigger from "@/app/webhook_trigger";
import DynamicText from "@/components/kokonutui/dynamic-text";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showDynamic, setShowDynamic] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => setShowDynamic(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null; // ⛔ Block PorscheScene during SSR/early hydration

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-black/80 via-black/30 to-transparent">

      {/* DynamicText first */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          showDynamic ? "opacity-100 z-20" : "opacity-0 z-0"
        }`}
      >
        <DynamicText />
      </div>

      {/* Porsche after */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showDynamic ? "opacity-0 z-0" : "opacity-100 z-10"
        }`}
      >
        <PorscheScene />
        <WebhookTrigger />
      </div>

    </div>
  );
}
