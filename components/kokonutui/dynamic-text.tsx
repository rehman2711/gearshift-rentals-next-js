"use client";

/**
 * @author: @dorian_baffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings } from "lucide-react";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "DRIVE", language: "English" },
  { text: "WHAT", language: "English" },
  { text: "YOU", language: "English" },
  { text: "WANT", language: "English" },
  { text: "WHEN", language: "English" },
  { text: "YOU", language: "English" },
  { text: "WANT", language: "English" },
  { text: "WELCOME", language: "English" },
  { text: "TO", language: "English" },
  { text: "GEARSHIFT", language: "English" },
];

const DynamicText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <section
      className="flex min-h-screen items-center justify-center gap-1 p-4"
      aria-label="Rapid greetings in different languages"
    >
      <div className="relative h-16 w-60 flex items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute flex items-center gap-2 text-7xl font-bold text-gray-800 dark:text-gray-200"
              aria-live="off"
              initial={textVariants.hidden}
              animate={textVariants.visible}
              exit={textVariants.exit}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div aria-hidden="true" />
              {greetings[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex justify-center items-center text-2xl font-bold text-gray-800 dark:text-gray-200">
            <div aria-hidden="true" />

            <Settings
              size={256}
              height={100}
              className=""
              style={{
                animation: "spin 2s linear infinite",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
