import type { Product } from "../../types";
import { useCartStore, entryKey } from "../../store/cartStore";
import { cn } from "../../utils/cn";
import { formatPrice } from "../../utils/format";
import Badge from "../ui/Badge";
import Stepper from "../ui/Stepper";
import VariantSelector from "./VariantSelector";

const ProductCard = ({ product }: { product: Product }) => {
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
