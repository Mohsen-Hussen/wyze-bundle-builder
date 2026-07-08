import { useCartStore, entryKey } from "../store/cartStore";
import type { Product } from "../types";

export const useProductCard = (product: Product) => {
	const setActiveVariant = useCartStore((s) => s.setActiveVariant);
	const increment = useCartStore((s) => s.increment);
	const decrement = useCartStore((s) => s.decrement);
	const activeVariants = useCartStore((s) => s.activeVariants);
	const entries = useCartStore((s) => s.entries);

	const variants = product.variants ?? [];
	const hasVariants = variants.length > 0;
	const activeVariantId = hasVariants
		? (activeVariants[product.id] ?? variants[0].id)
		: undefined;

	const qty = entries[entryKey(product.id, activeVariantId)]?.quantity ?? 0;
	const productTotal = Object.values(entries)
		.filter((e) => e.productId === product.id)
		.reduce((sum, e) => sum + e.quantity, 0);
	const selected = productTotal > 0;

	const { pricing } = product;
	const showSubtotal = qty > 0;
	const priceTotal = pricing.price * (showSubtotal ? qty : 1);
	const compareAtTotal =
		pricing.compareAt != null
			? pricing.compareAt * (showSubtotal ? qty : 1)
			: undefined;

	return {
		variants,
		hasVariants,
		activeVariantId,
		qty,
		selected,
		pricing,
		priceTotal,
		compareAtTotal,
		setActiveVariant,
		increment,
		decrement,
	};
};
