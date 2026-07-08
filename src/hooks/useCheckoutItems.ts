import { useMemo } from "react";
import { useCartStore } from "../store/cartStore";
import { useProducts } from "./useProducts";
import type { Product } from "../types";

export interface CheckoutItem {
	key: string;
	name: string;
	qty: number;
	free: boolean;
	line: number;
	suffix: string;
	variantLabel?: string;
}

export const useCheckoutItems = (): CheckoutItem[] => {
	const { data } = useProducts();
	const entries = useCartStore((s) => s.entries);

	return useMemo(() => {
		const productsById = new Map<string, Product>(
			(data?.products ?? []).map((product) => [product.id, product]),
		);

		return Object.values(entries).flatMap((entry) => {
			const product = productsById.get(entry.productId);
			if (!product) return [];

			const variantLabel = entry.variantId
				? product.variants?.find((variant) => variant.id === entry.variantId)
						?.label
				: undefined;

			return [
				{
					key: entry.variantId ?? entry.productId,
					name: product.name,
					variantLabel,
					qty: entry.quantity,
					free: product.pricing.free ?? false,
					line: product.pricing.price * entry.quantity,
					suffix: product.pricing.suffix ?? "",
				},
			];
		});
	}, [data?.products, entries]);
};
