```js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function FeaturedBellows({ allCarsData = [] }) {
  const [openId, setOpenId] = useState(null);
  const router = useRouter();

  return (
    <div
      className="relative w-full min-h-screen p-8"
      style={{
        background: `
        /* TOP: subtle line texture */
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
    
        /* MIDDLE: green-blue radial glows */
        radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
        radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
        radial-gradient(ellipse 90% 70% at 50% 0%, rgba(56, 189, 248, 0.14), transparent 65%),
        radial-gradient(ellipse 110% 50% at 80% 30%, rgba(34, 197, 94, 0.10), transparent 40%),
    
        /* BASE */
        rgb(254, 250, 250)
      `,
        backgroundSize: "40px 40px, 40px 40px, auto, auto, auto, auto, auto",
      }}
    >
      {/* GRID */}
      <div
        className="grid grid-cols-3 gap-6 auto-rows-[260px] max-w-7xl mx-auto"
        style={{ position: "relative" }}
      >
        {allCarsData.map((car) => {
          const isOpen = openId === car.id;

          return (
            <motion.div
              key={car.id}
              layout
              layoutId={`card-${car.id}`}
              // onClick={() => setOpenId(isOpen ? null : car.id)}
              transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
              className={`relative cursor-pointer rounded-2xl border border-gray-200 shadow-lg overflow-hidden
                ${isOpen ? "z-50 col-span-2 row-span-2" : "z-10"}
              `}
            >
              {/* COLLAPSED VIEW */}
              {!isOpen && (
                <div
                  className="h-full w-full flex flex-col justify-center items-center p-4"
                  style={{
                    background: `
                    /* TOP: subtle line texture */
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
                
                    /* MIDDLE: green-blue radial glows */
                    radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
                    radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
                    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(56, 189, 248, 0.14), transparent 65%),
                    radial-gradient(ellipse 110% 50% at 80% 30%, rgba(34, 197, 94, 0.10), transparent 40%),
                
                    /* BASE */
                    rgb(254, 250, 250)
                  `,
                    backgroundSize:
                      "40px 40px, 40px 40px, auto, auto, auto, auto, auto",
                  }}
                >
                  <>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-800 leading-none">
                        {car.carName}
                      </h3>

                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenId(car.id);
                          }}
                          className="flex items-center"
                        >
                          <Badge
                            variant="outline"
                            className="bg-green-400 hover:bg-green-400/70 rounded-sm px-3 py-1 leading-none"
                          >
                            See Details
                          </Badge>
                        </button>
                      </div>
                    </div>
                  </>

                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageMain}`}
                    alt={car.carName}
                    className="w-full h-40 object-cover rounded-xl"
                  />

                  <div className="mt-3 flex gap-2">
                    <Badge>{car.carBrandName}</Badge>
                    <Badge variant="secondary">{car.carFuelType}</Badge>
                  </div>
                </div>
              )}

              {/* EXPANDED VIEW */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 p-8 rounded-2xl z-50 border border-3 border-black/5"
                    style={{
                      background: `
                        /* TOP: subtle line texture */
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
                    
                        /* MIDDLE: green-blue radial glows */
                        radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
                        radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
                        radial-gradient(ellipse 90% 70% at 50% 0%, rgba(56, 189, 248, 0.14), transparent 65%),
                        radial-gradient(ellipse 110% 50% at 80% 30%, rgba(34, 197, 94, 0.10), transparent 40%),
                    
                        /* BASE */
                        rgb(254, 250, 250)
                      `,
                      backgroundSize:
                        "40px 40px, 40px 40px, auto, auto, auto, auto, auto",
                    }}
                  >
                    <div className="grid grid-cols-2 gap-8 h-full">
                      {/* IMAGE */}
                      <div className="h-full flex items-center justify-center">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageMain}`}
                          alt={car.carName}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-col justify-between h-full">
                        {/* TOP */}
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-center text-gray-900">
                              {car.carName}
                            </h2>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenId(null);
                              }}
                            >
                              <Badge
                                variant="destructive"
                                className="rounded-sm"
                              >
                                close
                              </Badge>
                            </button>
                          </div>

                          <p className="text-gray-600 text-center max-w-md mx-auto">
                            {car.carSlogan}
                          </p>

                          {/* SPECS */}
                          <div className="grid grid-cols-3 gap-y-6 gap-x-4 pt-4">
                            {[
                              ["Type", car.carModelName, "bg-blue-500"],
                              ["Brand", car.carBrandName, "bg-green-500"],
                              ["Range", car.carMileage, "bg-orange-500"],
                              ["Price", car.carRent, "bg-purple-500"],
                              ["Fuel", car.carFuelType, "bg-violet-700"],
                              ["Gear", car.carGearSystem, "bg-indigo-600"],
                            ].map(([label, value, color]) => (
                              <div
                                key={label}
                                className="flex flex-col items-center gap-2"
                              >
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                  {label}
                                </span>
                                <Badge className={`px-4 py-1 ${color}`}>
                                  {value}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col mx-auto">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 text-center mb-2">
                            RENT
                          </span>
                          <Badge className="py-3 px-8 bg-black/5 text-black text-base border border-4 border-white/40 rounded-xl">
                            {car.carCurrency} {car.carRent}
                          </Badge>
                        </div>

                        {/* BOTTOM BUTTONS */}
                        <div className="flex justify-center gap-4 pt-6">
                          <Button
                            className="bg-green-500 hover:bg-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/models/${car.id}`);
                            }}
                          >
                            View Details
                          </Button>

                          <Button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white"
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/models/availability/${car.id}`);
                            }}
                          >
                            Check Availability
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```
