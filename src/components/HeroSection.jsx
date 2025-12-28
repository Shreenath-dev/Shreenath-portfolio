"use client";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";

export const HeroSection = () => {
  const { scrollY } = useScroll();
  
  const yTitle = useTransform(scrollY, [0, 500], [0, 50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yButton = useTransform(scrollY, [0, 500], [0, 150]);
  
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);
  const opacityScroll = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-purple-800/20 via-transparent to-black"
        initial={{ scale: 1.3, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.1 }}
          >
            <motion.h1
              style={{ y: yTitle, opacity: opacityContent }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white"
            >
              <span className="block text-neutral-400">Hi, I'm</span>
              <span className="text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                Shreenath
              </span>{" "}
              <span className="text-blue-400">Subramanian</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <motion.p
              style={{ y: yText, opacity: opacityContent }}
              className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            >
              I build scalable backend systems and AI-driven products that solve
              real-world problems. Passionate about semantic search,
              recommendation engines, and GenAI. Skilled in FastAPI, Python,
              cloud-native development, and full-stack web automation.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.div style={{ y: yButton, opacity: opacityContent }}>
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                onClick={() => {
                  const el = document.querySelector("#projects");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View my work
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-neutral-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: opacityScroll }}
        transition={{ delay: 1.6 }}
      >
        <span className="mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-purple-400 animate-bounce" />
      </motion.div>
    </section>
  );
};
