"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function EnterpriseLoader() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <AnimatePresence>
      <motion.div
        key="enterprise-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-colors"
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Main logo container */}
          <div className="relative mb-12">
            {/* Orbital rings */}
            <div className="absolute inset-0 -m-10">
              {/* First orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-red-500/20 dark:border-red-500/30"
                style={{
                  width: "130px",
                  height: "130px",
                  left: "-15px",
                  top: "-15px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute w-2.5 h-2.5 rounded-full bg-red-500"
                  style={{
                    top: "50%",
                    right: "0",
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.7)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Second orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-red-500/15 dark:border-red-500/20"
                style={{
                  width: "170px",
                  height: "170px",
                  left: "-35px",
                  top: "-35px",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-red-400"
                  style={{
                    top: "18%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-red-400"
                  style={{
                    bottom: "18%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              </motion.div>
            </div>

            {/* Center logo with pulse effect */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500/20 dark:bg-red-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative z-10 rounded-full shadow-lg border-2 border-red-500/30 bg-white dark:bg-gray-800 p-2.5"
                animate={{
                  boxShadow: [
                    "0 4px 20px rgba(239, 68, 68, 0.2)",
                    "0 8px 30px rgba(239, 68, 68, 0.4)",
                    "0 4px 20px rgba(239, 68, 68, 0.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/placeholder-logo.png"
                  alt="LogisticsFuture Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex flex-col items-center gap-6">
            {/* Sleek progress bar */}
            <motion.div
              className="w-56 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0, width: "40%" }}
              animate={{ opacity: 1, width: "56" }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Text with typewriter effect */}
            <div className="text-center">
              <motion.h1
                className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                LogisticsFuture
              </motion.h1>

              <motion.div
                className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center h-6 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {[
                    "Initializing platform",
                    "Loading assets",
                    "Preparing dashboard",
                  ].map((text, index) => (
                    <motion.p
                      key={text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={
                        index === Math.floor((Date.now() / 2000) % 3)
                          ? "block"
                          : "hidden"
                      }
                    >
                      {text}
                    </motion.p>
                  ))}
                </AnimatePresence>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  ...
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
