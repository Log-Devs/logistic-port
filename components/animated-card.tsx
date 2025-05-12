"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends CardProps {
  children: ReactNode
  className?: string
  hoverEffect?: "lift" | "glow" | "border" | "none"
}

export default function AnimatedCard({ children, className, hoverEffect = "lift", ...props }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={
        hoverEffect === "lift"
          ? { y: -5, transition: { duration: 0.2 } }
          : hoverEffect === "glow"
            ? { boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)", transition: { duration: 0.2 } }
            : hoverEffect === "border"
              ? { borderColor: "rgba(59, 130, 246, 0.8)", transition: { duration: 0.2 } }
              : {}
      }
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
