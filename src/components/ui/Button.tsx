import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	fullWidth?: boolean;
	children: ReactNode;
}

const BASE =
	"inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-16 transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
	solid: "bg-purple text-white hover:bg-purple70",
	outline: "border border-purple bg-white text-purple hover:bg-panelBlue",
};

const Button = ({
	variant = "solid",
	fullWidth = false,
	className,
	children,
	type = "button",
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(BASE, VARIANTS[variant], fullWidth && "w-full", className)}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
