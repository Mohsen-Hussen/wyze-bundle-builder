import ReviewLine from "./ReviewLine";
import { formatPrice } from "../../utils/format";
import { useReviewItems } from "../../hooks/useReviewItems";

const ReviewPanel = () => {
	const { categories, grouped, productsById, shipping } = useReviewItems();

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
					const isPlan = c.id === "plan";
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
											showStepper={!isPlan}
											twoTone={isPlan}
										/>
									);
								})}
							</div>
						</section>
					);
				})}

				{shipping && (
					<div className="flex items-center justify-between gap-3 border-t border-dividerLight pt-6">
						<div className="flex items-center gap-3">
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white">
								<img
									src="/images/products/carbon_delivery.svg"
									alt="Fast Shipping"
									className="h-5 w-5"
								/>
							</span>
							<span className="text-18 font-medium text-ink">
								{shipping.label}
							</span>
						</div>
						<div className="flex items-baseline gap-2">
							{shipping.compareAt != null && (
								<span className="text-14 text-muted line-through">
									{formatPrice(shipping.compareAt)}
								</span>
							)}
							<span className="text-14 font-semibold text-purple">
								{shipping.free ? "FREE" : formatPrice(shipping.price)}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ReviewPanel;
