import Stepper from "../ui/Stepper";
import { cn } from "../../utils/cn";
import { formatPrice } from "../../utils/format";
import { useReviewLine } from "../../hooks/useReviewLine";
import type { Product } from "../../types";

interface ReviewLineProps {
	product: Product;
	qty: number;
	variantId?: string;
	showStepper?: boolean;
	twoTone?: boolean;
}

const ReviewLine = ({
	product,
	variantId,
	qty,
	showStepper = true,
	twoTone = false,
}: ReviewLineProps) => {
	const {
		variantLabel,
		suffix,
		priceTotal,
		compareAtTotal,
		firstWord,
		rest,
		increment,
		decrement,
	} = useReviewLine(product, variantId, qty);

	return (
		<div className="flex items-center justify-between gap-3 py-3">
			<div className="flex min-w-0 items-center gap-3">
				<img
					src={product.image}
					alt=""
					className={cn(
						"shrink-0 object-contain",
						twoTone ? "h-8 w-8" : "h-10 w-10 rounded-md bg-white",
					)}
				/>
				<div className="min-w-0 text-18">
					{twoTone ? (
						<span className="text-20 font-bold">
							<span className="text-ink">{firstWord} </span>
							<span className="text-purple">{rest}</span>
						</span>
					) : (
						<span className="font-medium text-ink">
							{product.name}
							{variantLabel ? ` — ${variantLabel}` : ""}
						</span>
					)}
				</div>
			</div>
			<div className="flex shrink-0 items-center gap-4">
				{showStepper && (
					<Stepper
						value={qty}
						onIncrement={() => increment(product.id, variantId)}
						onDecrement={() => decrement(product.id, variantId)}
					/>
				)}
				<div className="flex items-baseline gap-2 text-right">
					{compareAtTotal != null && (
						<span className="text-14 text-muted line-through">
							{formatPrice(compareAtTotal)}
							{suffix}
						</span>
					)}
					<span className="text-14 font-semibold text-purple">
						{product.pricing.free
							? "FREE"
							: `${formatPrice(priceTotal)}${suffix}`}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ReviewLine;
