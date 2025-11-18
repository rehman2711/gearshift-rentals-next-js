"use client";

import { useState } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeaturedBellows({ allCarsData = [] }) {
  const [openId, setOpenId] = useState(null);

  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full h-[100vh] flex justify-end items-end bg-gradient-to-t from-gray-50/80 via-white/60 to-transparent backdrop-blur-lg overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {allCarsData.map((car) => {
        const isOpen = openId === car.id;

        return (
          <motion.div
            key={car.id}
            layout
            onClick={() => setOpenId(isOpen ? null : car.id)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative group cursor-pointer flex-shrink-0 transition-all duration-700 rounded-2xl overflow-hidden shadow-lg border border-gray-200/60 backdrop-blur-md h-[100%] ${
              isOpen
                ? "w-[54%] h-[50vh] bg-white/90"
                : "w-[5rem] h-[50vh] bg-white/40 hover:bg-white/60"
            }`}
          >
            {/* Collapsed Vertical Tab (Left Side) */}
            {!isOpen && (
              <div className="absolute inset-0 flex justify-center items-center bg-white/40 border border-gray-200/40 hover:bg-white/70 transition-all duration-500 rounded-2xl">
                <p className="text-gray-800 font-mono font-extrabold text-3xl rotate-90 whitespace-nowrap tracking-[4]">
                  {car.cName}
                </p>
              </div>
            )}

            {/* Expanded Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, x: 1000 }} // 👈 start from right
                  animate={{ opacity: 1, x: 0 }} // 👈 slide into place
                  exit={{ opacity: 0, x: -1000 }} // 👈 slide out to left
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8"
                >
                  {/* Top: Name + Image */}
                  <div className="w-full flex flex-col items-center justify-center text-center space-y-4">
                    <h3 className="text-4xl font-bold text-gray-900 mb-16 font-mono">
                      {car.cName}
                    </h3>
                    <div className="w-full rounded-2xl flex justify-center items-center overflow-hidden">
                      <motion.img
                        src={car.cImg}
                        alt={car.cName}
                        className="w-full max-w-md h-56 object-cover rounded-xl shadow-md hover:scale-200 transition-transform duration-500"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-center max-w-2xl">
                    {car.cSlogan}
                  </p>

                  {/* Specs: labels + values */}
                  <div className="w-full flex items-center justify-center gap-5">
                    {/* Labels */}

                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs">
                        Type
                      </span>{" "}
                      <Badge className="py-1 px-4 bg-blue-500 hover:bg-blue-600">
                        {car.cModel}
                      </Badge>{" "}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs">
                        Brand
                      </span>{" "}
                      <Badge className="py-1 px-4 bg-green-400 hover:bg-green-500">
                        {car.cBrand}
                      </Badge>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs">
                        Range
                      </span>{" "}
                      <Badge className="py-1 px-4 bg-orange-400 hover:bg-orange-500">
                        {car.mileage}
                      </Badge>{" "}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs">
                        Price
                      </span>{" "}
                      <Badge className="py-1 px-4 bg-purple-500 hover:bg-purple-600">
                        {car.cMoney}
                      </Badge>{" "}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <span className="text-gray-500 font-semibold uppercase tracking-wide text-xs">
                        Fuel
                      </span>{" "}
                      <Badge className="py-1 px-4 bg-violet-700 hover:bg-violet-800">
                        {car.cFuel}
                      </Badge>{" "}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center items-center gap-5 pt-4">
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(car.id)
                        // router.push(`/models/${car.id}`);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Compare clicked");
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
