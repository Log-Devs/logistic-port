"use client"

import type { ReactNode } from "react"
import { motion, type Variant } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "slideUp"

interface AnimateInViewProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

const variants: Record<AnimationVariant, { hidden: Variant; visible: Variant }> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { y: 100 },
    visible: { y: 0 },
  },
}

export default function AnimateInView({
  children,
  className,
  variant = "fadeInUp",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
}: AnimateInViewProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={variants[variant]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
