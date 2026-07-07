import type { Step } from "../../types";
import { Chevron } from "../ui/Chevron";

interface StepHeaderProps {
	step: Step;
	count: number;
	open: boolean;
}

export const StepHeader = ({ step, count, open }: StepHeaderProps) => {
	return (
		<div className="w-full">
			<div className="px-8 pt-6 pb-3">
				<span className="text-12 font-medium uppercase tracking-wide text-muted">
					STEP {step.order} OF 4
				</span>
			</div>
			<div className="border-t border-dividerLight" />
			<div className="flex w-full items-center justify-between px-8 py-5">
				<span className="flex items-center gap-3">
					<img
						src={`/images/icons/step-${step.id}.svg`}
						alt=""
						aria-hidden="true"
						className="h-6 w-6 shrink-0"
					/>
					<span className="text-24 font-bold text-ink">{step.title}</span>
				</span>
				<span className="flex items-center gap-1.5 text-purple">
					<span className="text-14 font-medium">{count} selected</span>
					<Chevron open={open} />
				</span>
			</div>
		</div>
	);
};
