"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ModeSwitcher() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	const isDark = resolvedTheme === "dark"

	return (
		<button
			aria-label="Toggle theme"
			className="fixed top-3 right-14 z-[10000] bg-white/80 dark:bg-black/80 border border-red-500 rounded-full p-2 shadow-lg hover:scale-105 transition-all"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			<AnimatePresence mode="wait" initial={false}>
				{isDark ? (
					<motion.span
						key="sun"
						initial={{ rotate: -90, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: 90, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Sun className="h-6 w-6 text-red-500" />
					</motion.span>
				) : (
					<motion.span
						key="moon"
						initial={{ rotate: 90, opacity: 0 }}
						animate={{ rotate: 0, opacity: 1 }}
						exit={{ rotate: -90, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Moon className="h-6 w-6 text-red-500" />
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	)
}
