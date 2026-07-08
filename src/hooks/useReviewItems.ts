import { useMemo } from "react";
import { useProducts } from "./useProducts";
import { useCartStore } from "../store/cartStore";
import type { Category, Product } from "../types";

export interface ReviewItem {
	productId: string;
	qty: number;
	variantId?: string;
}

export interface ReviewGroups {
	categories: Category[];
	grouped: Record<string, ReviewItem[]>;
	productsById: Map<string, Product>;
}

export const useReviewItems = (): ReviewGroups => {
	const { data } = useProducts();
	const entries = useCartStore((s) => s.entries);

	const productsById = useMemo(() => {
		const map = new Map<string, Product>();
		for (const product of data?.products ?? []) {
			map.set(product.id, product);
		}
		return map;
	}, [data?.products]);

	const categories = data?.categories ?? [];

	const grouped = useMemo(() => {
		const groups: Record<string, ReviewItem[]> = {};
		for (const entry of Object.values(entries)) {
			const product = productsById.get(entry.productId);
			if (!product) continue;
			const category = product.category ?? "other";
			groups[category] = groups[category] ?? [];
			groups[category].push({
				productId: entry.productId,
				variantId: entry.variantId,
				qty: entry.quantity,
			});
		}
		return groups;
	}, [entries, productsById]);

	return { categories, grouped, productsById };
};
