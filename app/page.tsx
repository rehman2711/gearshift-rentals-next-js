"use client";

import { useEffect, useState } from "react";
import PorscheScene from "@/app/components/HeroBG/PorscheScene";
import WebhookTrigger from "@/app/webhook_trigger";
import DynamicText from "@/components/kokonutui/dynamic-text";

import { toast } from "sonner";
import { Toaster } from "sonner";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showDynamic, setShowDynamic] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setShowDynamic(false);

      // ✅ Show notification when Porsche appears
      toast.success(
        "Please wait while the API initializes via the webhook. Data may take up to one minute to load due to free-tier deployment.",
        {
          duration: Infinity, // ⛔ stays forever until dismissed
          closeButton: true,  // ✅ dismissible by click only
        }
      );
    }, 9000);
    

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#ffd6ff] via-{#ffd6ff}/30 to-transparent">

      {/* ✅ Toaster mounted once */}
      <Toaster position="bottom-right" />

      {/* DynamicText first */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
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
