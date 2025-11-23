"use client";

import { useEffect, useState } from "react";
import PorscheScene from "@/app/components/HeroBG/PorscheScene";
import WebhookTrigger from "@/app/webhook_trigger";
import DynamicText from "@/components/kokonutui/dynamic-text";

import { toast, Toaster } from "sonner";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showDynamic, setShowDynamic] = useState(true);
  const [showPorsche, setShowPorsche] = useState(false); // ✅ NEW

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setShowDynamic(false);
      setShowPorsche(true); // ✅ Porsche mounts ONLY now

      toast.success(
        "Please wait while the API initializes via the webhook. Data may take up to one minute to load due to free-tier deployment.",
        {
          duration: Infinity,
          closeButton: true,
        }
      );
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#ffd6ff] via-[#ffd6ff]/30 to-transparent">

      <Toaster position="bottom-right" />

      {/* ✅ DynamicText first */}
      {showDynamic && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <DynamicText />
        </div>
      )}

      {/* ✅ Porsche mounts ONLY after DynamicText ends */}
      {showPorsche && (
        <div className="absolute inset-0 z-10 animate-fade-in">
          <PorscheScene />
          <WebhookTrigger />
        </div>
      )}
    </div>
  );
}
