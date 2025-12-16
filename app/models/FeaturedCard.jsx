"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function FeaturedBellows({ allCarsData = [] }) {
  const [openId, setOpenId] = useState(null);
  const [activeRect, setActiveRect] = useState(null);
  const router = useRouter();

  const activeCar = allCarsData.find((c) => c.id === openId);

  const closeModal = () => {
    setOpenId(null);
    setActiveRect(null);
  };

  return (
    <div
      className="relative w-full min-h-screen p-8"
      style={{
        background: `
          repeating-linear-gradient(
            45deg,
            rgba(16, 185, 129, 0.06) 0,
            rgba(16, 185, 129, 0.06) 1px,
            transparent 1px,
            transparent 20px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(6, 182, 212, 0.06) 0,
            rgba(6, 182, 212, 0.06) 1px,
            transparent 10px,
            transparent 15px
          ),
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
          rgb(254, 250, 250)
        `,
      }}
    >
      {/* GRID */}
      <div className="grid grid-cols-3 gap-6 auto-rows-[260px] max-w-7xl mx-auto">
        {allCarsData.map((car) => (
          <motion.div
            key={car.id}
            data-card
            layout
            className="relative rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="h-full w-full flex flex-col justify-center items-center p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {car.carName}
              </h3>

              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageMain}`}
                alt={car.carName}
                className="w-full h-40 object-cover rounded-xl"
              />

              <div className="mt-3 flex items-center gap-4">
                <Badge>{car.carBrandName}</Badge>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget
                      .closest("[data-card]")
                      .getBoundingClientRect();

                    setActiveRect(rect);
                    setOpenId(car.id);
                  }}
                >
                  <Badge className="bg-green-400 hover:bg-green-400/70 rounded-sm">
                    See Details
                  </Badge>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BACKDROP BLUR OVERLAY */}
      <AnimatePresence>
        {openId && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {openId && activeRect && activeCar && (
          <motion.div
            initial={{
              opacity: 0,
              top: activeRect.top,
              left: activeRect.left,
              width: activeRect.width,
              height: activeRect.height,
            }}
            animate={{
              opacity: 1,
              top: "15%",
              left: "15%",
              width: "70%",
              height: "70%",
            }}
            exit={{
              opacity: 0,
              top: activeRect.top,
              left: activeRect.left,
              width: activeRect.width,
              height: activeRect.height,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed z-[999] rounded-2xl p-8 shadow-2xl border border-black/5"
            style={{
              background: `
                repeating-linear-gradient(
                  45deg,
                  rgba(16, 185, 129, 0.06) 0,
                  rgba(16, 185, 129, 0.06) 1px,
                  transparent 1px,
                  transparent 20px
                ),
                radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
                rgb(254, 250, 250)
              `,
            }}
          >
            <button onClick={closeModal} className="absolute top-4 right-4">
              <Badge variant="destructive">Close</Badge>
            </button>

            <div className="grid grid-cols-2 gap-6 h-full">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${activeCar.carImageMain}`}
                alt={activeCar.carName}
                className="w-full h-full object-cover rounded-xl"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-center">
                    {activeCar.carName}
                  </h2>

                  <p className="text-center text-gray-600 mt-4">
                    {activeCar.carSlogan}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                  {[
                    ["Type", activeCar.carModelName, "bg-blue-500"],
                    ["Brand", activeCar.carBrandName, "bg-green-500"],
                    ["Range", activeCar.carMileage, "bg-orange-500"],
                    ["Price", activeCar.carRent, "bg-purple-500"],
                    ["Fuel", activeCar.carFuelType, "bg-violet-700"],
                    ["Gear", activeCar.carGearSystem, "bg-indigo-600"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {label}
                      </span>
                      <Badge className={`px-4 py-1 ${color}`}>{value}</Badge>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    onClick={() => router.push(`/models/${activeCar.id}`)}
                    className="bg-green-500 hover:bg-green-500/80"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-yellow-400 hover:bg-yellow-400/80 text-white"
                    onClick={() =>
                      router.push(`/models/availability/${activeCar.id}`)
                    }
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
