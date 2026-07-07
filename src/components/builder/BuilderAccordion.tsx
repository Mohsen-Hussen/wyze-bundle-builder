import { useState, type ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import type { StepId } from "../../types";
import { useProducts } from "../../hooks/useProducts";
import { useCartTotals } from "../../hooks/useCartTotals";
import { cn } from "../../utils/cn";
import { StepHeader } from "./StepHeader";

interface BuilderAccordionProps {
	renderStep?: (stepId: StepId) => ReactNode;
}

export const BuilderAccordion = ({ renderStep }: BuilderAccordionProps) => {
	const { data } = useProducts();
	const { countsByStep } = useCartTotals();
	const [openStep, setOpenStep] = useState<string>("cameras");
	const steps = data?.steps ?? [];
	return (
		<Accordion.Root
			type="single"
			collapsible
			value={openStep}
			onValueChange={setOpenStep}
			className="w-full"
		>
			{steps.map((step) => {
				const open = openStep === step.id;
				return (
					<Accordion.Item
						key={step.id}
						value={step.id}
						className={cn("bg-white", open && "rounded-xl bg-panelBlue")}
					>
						<Accordion.Header>
							<Accordion.Trigger className="group block w-full text-left outline-none">
								<StepHeader
									step={step}
									count={countsByStep[step.id] ?? 0}
									open={open}
								/>
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content className="step-panel px-8 pb-8">
							{renderStep?.(step.id)}
						</Accordion.Content>
					</Accordion.Item>
				);
			})}
		</Accordion.Root>
	);
};
