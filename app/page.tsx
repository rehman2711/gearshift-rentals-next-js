"use client";

import { useEffect } from "react";
import WebhookTrigger from "@/app/webhook_trigger";
import { toast, Toaster } from "sonner";

export default function Home() {
  useEffect(() => {
    toast.success(
      "Please wait while the API initializes via the webhook. Data may take up to one minute to load due to free-tier deployment.",
      { duration: Infinity, closeButton: true }
    );
  }, []);

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      
      {/* CENTERED HERO CONTAINER */}
      <div className="w-[85%] h-[70%] grid grid-cols-4">
        
        {/* LEFT: Video section (75%) */}
        <div className="col-span-3 flex items-center justify-center">
          <div className="w-full h-full flex gap-4 group overflow-hidden">
            
            {/* Video 1 */}
            <div className="flex-1 overflow-hidden transition-all duration-800 ease-in-out group-hover:flex-[0.8] hover:flex-[8]">
              <video
                src="/car-bg.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video 2 */}
            <div className="flex-1 overflow-hidden transition-all duration-800 ease-in-out group-hover:flex-[0.8] hover:flex-[8]">
              <video
                src="/car-bg.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video 3 */}
            <div className="flex-1 overflow-hidden transition-all duration-800 ease-in-out group-hover:flex-[0.8] hover:flex-[8]">
              <video
                src="/car-bg.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* RIGHT: Text section (25%) */}
        <div className="col-span-1 flex items-center justify-start px-10">
          <div className="space-y-6 font-slackey text-black dark:text-white">
            <h1 className="text-5xl font-extrabold leading-tight">
              Drive the Legend
              <br />
              <span className="text-yellow-400">Porsche 911 Carrera</span>
            </h1>

            <p className="text-xl text-green-500 leading-relaxed">
              Drive What You Want ,
              Drive When You Want . . . 
            </p>
          </div>
        </div>

      </div>

      <Toaster position="bottom-right" />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <WebhookTrigger />
      </div>
    </div>
  );
}
