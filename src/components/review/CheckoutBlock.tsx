import { useState } from "react";
import { useCartTotals } from "../../hooks/useCartTotals";
import { formatPrice } from "../../utils/format";
import Button from "../ui/Button";

const CheckoutBlock = () => {
	const { total, preDiscountTotal, savings, financing } = useCartTotals();
	const [confirmed, setConfirmed] = useState<boolean>(false);

	const handleCheckout = () => {
		setConfirmed(true);
		window.setTimeout(() => setConfirmed(false), 4000);
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
				<span className="rounded-lg bg-purple px-3 py-2 text-14 font-medium text-white">
					as low as {formatPrice(financing)}/mo
				</span>
				<span className="flex items-baseline gap-2">
					{preDiscountTotal > total && (
						<span className="text-18 text-muted line-through">
							{formatPrice(preDiscountTotal)}
						</span>
					)}
					<span className="text-30 font-bold text-purple">
						{formatPrice(total)}
					</span>
				</span>
			</div>

			<p className="text-center text-16 font-medium text-green">
				Congrats! You're saving {formatPrice(savings)} on your security bundle!
			</p>

			<Button variant="solid" fullWidth onClick={handleCheckout}>
				Checkout
			</Button>

			{confirmed && (
				<p className="text-center text-14 font-medium text-green" role="status">
					Order placed - thanks for building your Wyze system! (demo)
				</p>
			)}

			<button
				type="button"
				className="mx-auto text-14 italic text-ink underline"
			>
				Save my system for later
			</button>
		</div>
	);
};

export default CheckoutBlock;
