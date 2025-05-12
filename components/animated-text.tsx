"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerChildren?: number
  type?: "chars" | "words" | "lines"
}

export default function AnimatedText({
  children,
  className,
  delay = 0,
  staggerChildren = 0.03,
  type = "words",
}: AnimatedTextProps) {
  if (typeof children !== "string") {
    return <div className={className}>{children}</div>
  }

  const getAnimationItems = () => {
    if (type === "chars") return children.split("")
    if (type === "words") return children.split(" ")
    return [children] // lines
  }

  const items = getAnimationItems()

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className={cn("inline-block", className)} variants={container} initial="hidden" animate="visible">
      {items.map((item, index) => (
        <motion.span key={index} variants={child} className={type === "words" ? "inline-block mr-1" : "inline-block"}>
          {item}
          {type === "words" && index !== items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.div>
  )
}
