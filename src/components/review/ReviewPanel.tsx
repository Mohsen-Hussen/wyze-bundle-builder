import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/cartStore";
import ReviewLine from "./ReviewLine";

const ReviewPanel = () => {
	const { data } = useProducts();
	const entries = useCartStore((s) => s.entries);

	const productsById = useMemo(() => {
		const map = new Map<string, import("../../types").Product>();
		for (const p of data?.products ?? []) map.set(p.id, p);
		return map;
	}, [data]);

	const categories = data?.categories ?? [];

	const grouped = useMemo(() => {
		const groups: Record<
			string,
			Array<{ productId: string; variantId?: string; qty: number }>
		> = {};
		for (const e of Object.values(entries)) {
			const p = productsById.get(e.productId);
			if (!p) continue;
			const cat = p.category ?? "other";
			groups[cat] = groups[cat] ?? [];
			groups[cat].push({
				productId: e.productId,
				variantId: e.variantId,
				qty: e.quantity,
			});
		}
		return groups;
	}, [entries, productsById]);

	return (
		<div className="w-full rounded-xl bg-panelBlue p-6">
			<h3 className="text-18 font-semibold text-ink">Your security system</h3>
			<p className="text-14 text-slate">
				Review your personalized protection system designed to keep what matters
				most safe.
			</p>

			<div className="mt-6 space-y-6">
				{categories.map((c) => {
					const items = grouped[c.id] ?? [];
					if (items.length === 0) return null;
					return (
						<section key={c.id}>
							<div className="text-12 uppercase text-muted mb-3">{c.label}</div>
							<div className="divide-y">
								{items.map((it) => {
									const product = productsById.get(it.productId);
									if (!product) return null;
									return (
										<ReviewLine
											key={`${it.productId}-${it.variantId ?? "default"}`}
											product={product}
											variantId={it.variantId}
											qty={it.qty}
										/>
									);
								})}
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewPanel;
