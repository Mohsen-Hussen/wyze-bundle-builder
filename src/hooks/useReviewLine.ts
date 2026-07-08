import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";

export interface ReviewLineData {
	variantLabel?: string;
	suffix: string;
	priceTotal: number;
	compareAtTotal?: number;
	firstWord: string;
	rest: string;
	increment: (productId: string, variantId?: string) => void;
	decrement: (productId: string, variantId?: string) => void;
}

export const useReviewLine = (
	product: Product,
	variantId?: string,
	qty: number = 0,
): ReviewLineData => {
	const increment = useCartStore((s) => s.increment);
	const decrement = useCartStore((s) => s.decrement);

	const variantLabel = variantId
		? (product.variants?.find((v) => v.id === variantId)?.label ?? variantId)
		: undefined;

	const suffix = product.pricing.suffix ?? "";
	const priceTotal = product.pricing.price * qty;
	const compareAtTotal =
		product.pricing.compareAt != null
			? product.pricing.compareAt * qty
			: undefined;

	const [firstWord, ...restWords] = product.name.split(" ");
	const rest = restWords.join(" ");

	return {
		variantLabel,
		suffix,
		priceTotal,
		compareAtTotal,
		firstWord,
		rest,
		increment,
		decrement,
	};
};
