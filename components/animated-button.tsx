"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode
  className?: string
  hoverScale?: number
}

export default function AnimatedButton({ children, className, hoverScale = 1.05, ...props }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: hoverScale }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}
