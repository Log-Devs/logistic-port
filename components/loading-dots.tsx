"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingDotsProps {
  className?: string
  color?: string
  size?: number
}

export default function LoadingDots({ className, color = "currentColor", size = 4 }: LoadingDotsProps) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
