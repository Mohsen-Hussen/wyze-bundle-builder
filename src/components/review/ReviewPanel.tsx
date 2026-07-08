import ReviewLine from "./ReviewLine";
import { useReviewItems } from "../../hooks/useReviewItems";

const ReviewPanel = () => {
	const { categories, grouped, productsById } = useReviewItems();

	return (
		<div>
			<span className="text-12 font-medium uppercase tracking-wide text-muted desktop:hidden">
				REVIEW
			</span>
			<h3 className="text-28 font-bold text-ink">Your security system</h3>
			<p className="mt-1 text-16 text-slate">
				Review your personalized protection system designed to keep what matters
				most safe.
			</p>

			<div className="mt-6 space-y-6">
				{categories.map((c) => {
					const items = grouped[c.id] ?? [];
					if (items.length === 0) return null;
					return (
						<section key={c.id}>
							<div className="mb-3 text-12 uppercase text-muted">
								{c.labelMobile ? (
									<>
										<span className="md:hidden">{c.labelMobile}</span>
										<span className="hidden md:inline">{c.label}</span>
									</>
								) : (
									c.label
								)}
							</div>
							<div className="divide-y divide-dividerLight">
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
