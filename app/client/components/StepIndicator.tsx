import { Check } from "lucide-react";

const StepIndicator = ({ step }: { step: number }) => (
	<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
		{[1, 2, 3, 4].map((s) => (
			<div key={s} className="flex items-center gap-1 sm:gap-2 md:gap-4">
				<div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold
					${step === s
						? 'bg-[#1A2B6D] text-white border-[#1A2B6D]'
					: s < step
						? 'bg-[#1A2B6D] text-white border-[#1A2B6D]'
						: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}
				`}>
					{s === 4 ? <Check size={16} className="sm:hidden" /> : s}
					{s === 4 ? <Check size={20} className="hidden sm:block" /> : null}
				</div>
				{s < 4 && (
					<div
						className={`w-5 sm:w-7 md:w-9 h-1 sm:h-1.5 md:h-2 rounded ${s <= step - 1 ? 'bg-[#FF0000]' : 'bg-gray-200 dark:bg-gray-700'}`}
					/>
				)}
			</div>
		))}
		<span className="hidden sm:inline-block ml-2 md:ml-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">Step {step} of 4</span>
	</div>
);

export default StepIndicator;
