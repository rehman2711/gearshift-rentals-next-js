import { Suspense } from "react";
import WebhookTrigger from "@/app/webhook_trigger";
import Video from "@/app/components/Video";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background flex items-center justify-center px-4 md:px-0">
      <div className="w-full md:w-[85%] md:h-[70%] grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* TEXT SECTION */}
        <div className="order-1 md:order-2 md:col-span-1 flex items-center md:items-center justify-center md:justify-start md:px-10">
          <div className="space-y-4 md:space-y-6 text-center md:text-left font-slackey text-black dark:text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Drive the Legend
              <br />
              <span className="text-yellow-400">
                Porsche 911 Carrera
              </span>
            </h1>

            <p className="text-base md:text-xl text-green-500 leading-relaxed">
              Drive What You Want, Drive When You Want.
            </p>
          </div>
        </div>

        {/* VIDEO SECTION */}
        <div className="order-2 md:order-1 md:col-span-3 flex items-center justify-center">
          <div
            className="
              w-full
              h-full
              flex flex-col md:flex-row
              gap-4
              overflow-hidden
              md:group
            "
          >
            {["/car-video1.mp4", "/car-video2.mp4", "/car-video3.mp4"].map(
              (src, index) => (
                <div
                  key={index}
                  className="
                    w-full
                    h-[180px] sm:h-[220px] md:h-full
                    md:flex-1
                    overflow-hidden
                    transition-all
                    duration-700
                    ease-in-out
                    md:group-hover:flex-[0.8]
                    md:hover:flex-[8]
                  "
                >
                  <Suspense>
                    <Video src={src} />
                  </Suspense>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <WebhookTrigger />
      </div>
    </div>
  );
}
