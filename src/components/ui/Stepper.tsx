import { Minus, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

interface StepperProps {
	value: number;
	onIncrement: () => void;
	onDecrement: () => void;
	min?: number;
	disabled?: boolean;
	className?: string;
}

const BTN =
	"flex h-7 w-7 items-center justify-center rounded-md border border-borderGrey text-ink transition-colors hover:bg-fillGrey disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

const Stepper = ({
	value,
	onIncrement,
	onDecrement,
	min = 0,
	disabled = false,
	className,
}: StepperProps) => {
	const decDisabled = disabled || value <= min;
	return (
		<div className={cn("inline-flex items-center gap-2", className)}>
			<button
				type="button"
				aria-label="Decrease quantity"
				className={BTN}
				onClick={onDecrement}
				disabled={decDisabled}
			>
				<Minus size={14} />
			</button>
			<span className="min-w-4 text-center text-14 font-semibold tabular-nums text-ink">
				{value}
			</span>
			<button
				type="button"
				aria-label="Increase quantity"
				className={BTN}
				onClick={onIncrement}
				disabled={disabled}
			>
				<Plus size={14} />
			</button>
		</div>
	);
};

export default Stepper;
