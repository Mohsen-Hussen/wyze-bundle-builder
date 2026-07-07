import { cn } from "../../utils/cn";

interface ColorChipProps {
	label: string;
	swatch?: string;
	image?: string;
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

const ColorChip = ({
	label,
	swatch,
	image,
	active = false,
	onClick,
	className,
}: ColorChipProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={cn(
				"inline-flex items-center gap-2 rounded-md border px-2 py-1 text-12 font-medium transition-colors",
				active ? "border-purple text-ink" : "border-borderGrey text-slate",
				className,
			)}
		>
			{image ? (
				<img
					src={image}
					alt=""
					aria-hidden="true"
					className="h-6 w-6 rounded-md object-contain"
				/>
			) : (
				<span
					className="h-3.5 w-3.5 rounded-full border border-borderGrey"
					style={{ backgroundColor: swatch }}
				/>
			)}
			<span>{label}</span>
		</button>
	);
};

export default ColorChip;
