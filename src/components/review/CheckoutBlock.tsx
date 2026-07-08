import { useState } from "react";
import { useCartTotals } from "../../hooks/useCartTotals";
import { useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils/format";
import Button from "../ui/Button";
import CheckoutConfirmation from "./CheckoutConfirmation";

const CheckoutBlock = () => {
  const { total, preDiscountTotal, savings, financing } = useCartTotals();
  const saveForLater = useCartStore((s) => s.saveForLater);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveForLater = () => {
    saveForLater();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-5">
        <img
          src="/images/products/guarantee-seal.svg"
          alt="100% Wyze satisfaction guarantee"
          className="h-24 w-24 shrink-0"
        />
        <div>
          <h3 className="text-20 font-semibold text-ink">
            30-day hassle-free returns
          </h3>
          <p className="mt-2 text-16 text-slate">
            If you're not totally in love with the product, we will refund you
            100%.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-purple px-3 py-2 text-16 font-medium text-white">
          as low as {formatPrice(financing)}/mo
        </span>
        <span className="flex items-baseline gap-2">
          {preDiscountTotal > total && (
            <span className="text-22 text-muted line-through">
              {formatPrice(preDiscountTotal)}
            </span>
          )}
          <span className="text-28 font-bold text-purple">
            {formatPrice(total)}
          </span>
        </span>
      </div>

      <p className="text-center text-16 font-medium text-green">
        Congrats! You're saving {formatPrice(savings)} on your security bundle!
      </p>

      <Button variant="solid" fullWidth onClick={() => setShowConfirm(true)}>
        Checkout
      </Button>

      <button
        type="button"
        onClick={handleSaveForLater}
        className="mx-auto text-14 italic text-ink underline"
      >
        {saved ? "Saved - we'll keep it for your return" : "Save my system for later"}
      </button>

      <CheckoutConfirmation
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CheckoutBlock;
