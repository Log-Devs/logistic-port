"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Define slide content type
interface Slide {
	id: number;
	image: string;
	title: string;
	subtitle: string;
}

// Example slides with professional logistics imagery
const slides: Slide[] = [
	{
		id: 1,
		image: "/industrial-port-container-yard.jpg", // Corrected path
		title: "Global Logistics Excellence",
		subtitle:
			"Seamless end-to-end supply chain solutions for businesses worldwide",
	},
	{
		id: 2,
		image: "/register-bg.jpg", // Corrected path
		title: "Efficient Freight Management",
		subtitle: "Optimizing your shipping operations with advanced technology",
	},
	{
		id: 3,
		image: "/warehouse.jpg", // Corrected path
		title: "Smart Warehousing Solutions",
		subtitle: "State-of-the-art facilities ensuring security and efficiency",
	},
];

export default function ProfessionalHero() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const slideInterval = 3000; // 3 seconds per slide

	// Auto-advance slides
	useEffect(() => {
		const resetTimeout = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};

		resetTimeout();
		timeoutRef.current = setTimeout(() => {
			setCurrentSlide((prevSlide) =>
				prevSlide === slides.length - 1 ? 0 : prevSlide + 1
			);
		}, slideInterval);

		return () => {
			resetTimeout();
		};
	}, [currentSlide]);

	// Handle navigation
	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === slides.length - 1 ? 0 : prevSlide + 1
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? slides.length - 1 : prevSlide - 1
		);
	};

	return (
		<div className="relative h-[80vh] w-full overflow-hidden">
			{/* Slides */}
			<AnimatePresence mode="wait">
				<motion.div
					key={slides[currentSlide].id}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }} // faster fade
					className="absolute inset-0"
				>
					{/* Image with overlay */}
					<div className="relative h-full w-full">
						<Image
							src={slides[currentSlide].image}
							alt={slides[currentSlide].title}
							fill
							priority
							className="object-cover"
							sizes="100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
					</div>

					{/* Content */}
					<div className="absolute inset-0 flex items-center">
						<div className="container px-4 md:px-6 z-10">
							<div className="max-w-3xl ml-4 md:ml-12">
								<motion.h1
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.7, delay: 0.2 }}
									className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
								>
									{slides[currentSlide].title}
								</motion.h1>
								<motion.p
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.7, delay: 0.4 }}
									className="text-xl md:text-2xl text-white/90 mb-8"
								>
									{slides[currentSlide].subtitle}
								</motion.p>
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.7, delay: 0.6 }}
									className="flex flex-wrap gap-4"
								>
									<Button
										size="lg"
										className="bg-primary hover:bg-primary/90 text-white"
									>
										<Link href="/register">Get Started</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-white text-white hover:bg-white/10"
									>
										<Link href="/about">Learn More</Link>
									</Button>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation controls */}
			<div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-8" : "bg-white/50"
							}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Arrow navigation */}
			<Button
				variant="ghost"
				size="icon"
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 rounded-full h-12 w-12"
				onClick={prevSlide}
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-6 w-6" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 rounded-full h-12 w-12"
				onClick={nextSlide}
				aria-label="Next slide"
			>
				<ChevronRight className="h-6 w-6" />
			</Button>
		</div>
	);
}
