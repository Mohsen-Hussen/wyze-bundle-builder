import { useProductCard } from "../../hooks/useProductCard";
import Badge from "../ui/Badge";
import Stepper from "../ui/Stepper";
import VariantSelector from "./VariantSelector";
import { cn } from "../../utils/cn";
import { formatPrice } from "../../utils/format";
import type { Product } from "../../types";

const ProductCard = ({ product }: { product: Product }) => {
	const {
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
	} = useProductCard(product);

	return (
		<div
			className={cn(
				"relative flex min-w-0 flex-col gap-3 overflow-hidden rounded-xl border-2 bg-white p-5",
				selected ? "border-purple" : "border-borderGrey",
			)}
		>
			{product.badge && (
				<Badge className="absolute left-4 top-4 z-10">{product.badge}</Badge>
			)}

			<img
				src={product.image}
				alt={product.name}
				className="mx-auto h-40 w-full object-contain"
			/>

			<h3 className="text-20 font-semibold text-ink">{product.name}</h3>

			{product.description && (
				<p className="text-14 text-slate">
					{product.description}{" "}
					{product.learnMoreUrl && (
						<a
							href={product.learnMoreUrl}
							className="font-medium text-purple underline"
						>
							Learn More
						</a>
					)}
				</p>
			)}

			{hasVariants && (
				<VariantSelector
					variants={variants}
					activeId={activeVariantId!}
					onSelect={(vId) => setActiveVariant(product.id, vId)}
					productImage={product.image}
				/>
			)}

			<div className="mt-auto flex items-center justify-between gap-2">
				<Stepper
					value={qty}
					onIncrement={() => increment(product.id, activeVariantId)}
					onDecrement={() => decrement(product.id, activeVariantId)}
				/>
				<div className="flex items-baseline gap-2">
					{compareAtTotal != null && (
						<span className="text-16 text-saleRed line-through">
							{formatPrice(compareAtTotal)}
						</span>
					)}
					<span className="text-16 font-semibold text-ink">
						{pricing.free
							? "FREE"
							: `${formatPrice(priceTotal)}${pricing.suffix ?? ""}`}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
