"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

// Array of slide objects for the professional hero carousel
const slides = [
  {
    id: 1,
    image: "/industrial-port-container-yard.jpg",
    title: "Global Logistics Excellence",
    subtitle: "Seamless end-to-end supply chain solutions for businesses worldwide",
  },
  {
    id: 2,
    image: "/register-bg.jpg",
    title: "Efficient Freight Management",
    subtitle: "Optimizing your shipping operations with advanced technology",
  },
  {
    id: 3,
    image: "/warehouse.jpg",
    title: "Smart Warehousing Solutions",
    subtitle: "State-of-the-art facilities ensuring security and efficiency",
  },
]; // Array of slide objects for the professional hero carousel

// Default interval (in milliseconds) for auto-sliding between cards
// Extracted as a named constant for clarity and maintainability
const DEFAULT_SLIDE_INTERVAL = 30000; // 30 seconds

/**
 * ProfessionalCardSlider component displays a carousel of professional slides.
 * The slide interval is configurable via the 'slideInterval' prop, defaulting to 30 seconds.
 * @param {number} slideInterval - Optional. Interval in ms between slides. Defaults to DEFAULT_SLIDE_INTERVAL.
 */
interface ProfessionalCardSliderProps {
  /**
   * Interval (in ms) between automatic slide transitions.
   * Defaults to 30,000 ms (30 seconds).
   */
  slideInterval?: number;
}

export default function ProfessionalCardSlider({ slideInterval = DEFAULT_SLIDE_INTERVAL }: ProfessionalCardSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Helper function to clear the existing timeout if any
    const resetTimeout = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    // Clear previous timeout before setting a new one
    resetTimeout();
    // Set up the auto-slide interval
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentSlide((prev: number) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, slideInterval);
    // Cleanup function to clear timeout on unmount or before next effect
    return () => resetTimeout();
  }, [currentSlide, slideInterval]);

	const nextSlide = () => {
		setDirection(1);
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setDirection(-1);
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	const cardVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 1,
			zIndex: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
			zIndex: 1,
			transition: { type: "spring", stiffness: 300, damping: 30 },
		},
		exit: (direction: number) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 1,
			zIndex: 0,
			transition: { type: "spring", stiffness: 300, damping: 30 },
		}),
	};

	const contentVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (custom: number) => ({
			opacity: 1,
			y: 0,
			transition: { delay: 0.2 + custom * 0.1, duration: 0.3 },
		}),
	};

	return (
		<div className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
			<AnimatePresence initial={false} custom={direction} mode="popLayout">
				<motion.div
					key={currentSlide}
					custom={direction}
					variants={cardVariants}
					initial="enter"
					animate="center"
					exit="exit"
					className="absolute inset-0"
				>
					<div className="relative h-full w-full shadow-2xl">
						<Image
							src={slides[currentSlide].image}
							alt={slides[currentSlide].title}
							fill
							priority
							className="object-cover"
							sizes="100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

						<div className="absolute inset-0 flex items-center">
							<div className="container px-4 md:px-6 z-10">
								<div className="max-w-3xl ml-4 md:ml-12">
									<motion.h1
										custom={0}
										variants={contentVariants}
										initial="hidden"
										animate="visible"
										className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
									>
										{slides[currentSlide].title}
									</motion.h1>
									<motion.p
										custom={1}
										variants={contentVariants}
										initial="hidden"
										animate="visible"
										className="text-xl md:text-2xl text-white/90 mb-8"
									>
										{slides[currentSlide].subtitle}
									</motion.p>
									<motion.div
										custom={2}
										variants={contentVariants}
										initial="hidden"
										animate="visible"
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
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Navigation elements remain the same */}
			<div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => {
							setDirection(index > currentSlide ? 1 : -1);
							setCurrentSlide(index);
						}}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-8" : "bg-white/50"
							}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

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