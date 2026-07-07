import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCartStore } from "../../store/cartStore";
import { useCartTotals } from "../../hooks/useCartTotals";
import { formatPrice } from "../../utils/format";
import Button from "../ui/Button";

interface CheckoutConfirmationProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutConfirmation = ({ open, onClose }: CheckoutConfirmationProps) => {
  const { data } = useProducts();
  const entries = useCartStore((s) => s.entries);
  const { total, savings } = useCartTotals();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const productsById = new Map((data?.products ?? []).map((p) => [p.id, p]));
  const items = Object.values(entries).flatMap((e) => {
    const p = productsById.get(e.productId);
    if (!p) return [];
    const variantLabel = e.variantId
      ? p.variants?.find((v) => v.id === e.variantId)?.label
      : undefined;
    return [
      {
        key: e.variantId ?? e.productId,
        name: p.name,
        variantLabel,
        qty: e.quantity,
        free: p.pricing.free ?? false,
        line: p.pricing.price * e.quantity,
        suffix: p.pricing.suffix ?? "",
      },
    ];
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order confirmation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-24 font-bold text-ink">Order placed!</h2>
        <p className="mt-1 text-14 text-slate">
          Thanks for building your Wyze system. Here&apos;s what&apos;s on the way
          (demo):
        </p>

        <div className="mt-5 divide-y divide-dividerLight">
          {items.map((it) => (
            <div
              key={it.key}
              className="flex items-center justify-between gap-4 py-2 text-14"
            >
              <span className="text-ink">
                {it.name}
                {it.variantLabel ? ` (${it.variantLabel})` : ""}
                <span className="text-muted"> x{it.qty}</span>
              </span>
              <span className="shrink-0 font-medium text-ink">
                {it.free ? "FREE" : `${formatPrice(it.line)}${it.suffix}`}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dividerLight pt-4">
          <span className="text-16 font-semibold text-ink">Total</span>
          <span className="text-20 font-bold text-purple">
            {formatPrice(total)}
          </span>
        </div>
        <p className="mt-1 text-right text-12 font-medium text-green">
          You saved {formatPrice(savings)}
        </p>

        <Button variant="solid" fullWidth className="mt-6" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
