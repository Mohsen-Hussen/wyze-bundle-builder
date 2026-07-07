import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

interface ChevronProps {
	open?: boolean;
	size?: number;
	className?: string;
}

const Chevron = ({ open = false, size = 18, className }: ChevronProps) => {
	return (
		<ChevronDown
			size={size}
			className={cn(
				"text-purple transition-transform duration-200",
				open && "rotate-180",
				className,
			)}
		/>
	);
};

export default Chevron;
