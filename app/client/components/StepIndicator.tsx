import { Check } from "lucide-react";

const StepIndicator = ({ step }: { step: number }) => (
	<div className="flex items-center justify-center gap-4 mb-6">
		{[1, 2, 3, 4].map((s) => (
			<div key={s} className="flex items-center gap-4">
				<div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-md font-semibold
					${step === s || s < step
						? 'bg-[#1A2B6D] dark:bg-[#1A2B6D] text-white border-[#1A2B6D] dark:border-[#1A2B6D]'
						: 'bg-[#CCCCCC] dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}
				`}>
					{s === 4 ? <Check size={24} /> : s}
				</div>
				{s < 4 && (
					<div
						className={`w-9 h-2 rounded ${s <= step - 1 ? 'bg-[#FF0000]' : 'bg-secondary dark:bg-gray-700'}`}
					/>
				)}
			</div>
		))}
	</div>
);

export default StepIndicator;
