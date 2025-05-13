"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function FullPageLoader() {
	return (
		<AnimatePresence>
			<motion.div
				key="loader"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.4 }}
				className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-black transition-colors"
			>
				<motion.div
					className="mb-8 flex items-center justify-center"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
						className="rounded-full shadow-lg border-4 border-red-500 bg-white dark:bg-black p-2"
					>
						<Image
							src="/placeholder-logo.png"
							alt="Logo"
							width={56}
							height={56}
							className="rounded-full"
							priority
						/>
					</motion.div>
				</motion.div>
				<motion.div className="flex space-x-2 mb-6">
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className="w-5 h-5 rounded-full"
							style={{ background: "linear-gradient(135deg, #ff1a1a 60%, #b30000 100%)" }}
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.7, 1, 0.7],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: i * 0.2,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
				<motion.span
					className="text-lg font-semibold text-red-600 tracking-wide"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					Loading LogisticsFuture...
				</motion.span>
			</motion.div>
		</AnimatePresence>
	)
}
