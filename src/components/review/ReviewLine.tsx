import Stepper from "../ui/Stepper";
import { formatPrice } from "../../utils/format";
import { useCartStore } from "../../store/cartStore";
import type { Product } from "../../types";

const ReviewLine = ({
	product,
	variantId,
	qty,
}: {
	product: Product;
	variantId?: string;
	qty: number;
}) => {
	const increment = useCartStore((s) => s.increment);
	const decrement = useCartStore((s) => s.decrement);

	const displayName = variantId
		? `${product.name} — ${product.variants?.find((v) => v.id === variantId)?.label ?? variantId}`
		: product.name;

	const priceTotal = product.pricing.price * qty;
	const compareAtTotal =
		product.pricing.compareAt != null
			? product.pricing.compareAt * qty
			: undefined;

	return (
		<div className="flex items-center justify-between py-3">
			<div className="flex items-center gap-3">
				<img
					src={product.image}
					alt=""
					className="h-10 w-10 rounded-md object-contain"
				/>
				<div className="text-14">
					<div className="font-medium text-ink">{displayName}</div>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Stepper
					value={qty}
					onIncrement={() => increment(product.id, variantId)}
					onDecrement={() => decrement(product.id, variantId)}
				/>
				<div className="text-right">
					{compareAtTotal != null && (
						<div className="text-14 text-saleRed line-through">
							{formatPrice(compareAtTotal)}
						</div>
					)}
					<div className="text-14 font-semibold text-ink">
						{product.pricing.free ? "FREE" : formatPrice(priceTotal)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewLine;
