import { useMemo } from "react";
import type { CartEntry, Product, Step, StepId } from "../types";
import { useProducts } from "./useProducts";
import { useCartStore } from "../store/cartStore";

export const FIXED_FINANCING = 19.19;

const round2 = (n: number): number => Math.round(n * 100) / 100;

export interface CartTotals {
  total: number;
  preDiscountTotal: number;
  savings: number;
  financing: number;
  countsByStep: Record<StepId, number>;
}

export const computeTotals = (
  entries: CartEntry[],
  products: Product[],
  steps: Step[],
): CartTotals => {
  const byId = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  let preDiscountTotal = 0;
  for (const e of entries) {
    const p = byId.get(e.productId);
    if (!p) continue;
    total += p.pricing.price * e.quantity;
    preDiscountTotal += (p.pricing.compareAt ?? p.pricing.price) * e.quantity;
  }
  total = round2(total);
  preDiscountTotal = round2(preDiscountTotal);

  const chosenProductIds = new Set(
    entries.filter((e) => e.quantity > 0).map((e) => e.productId),
  );
  const countsByStep = {} as Record<StepId, number>;
  for (const step of steps) {
    let count = 0;
    for (const pid of chosenProductIds) {
      if (byId.get(pid)?.category === step.category) count++;
    }
    countsByStep[step.id] = count;
  }

  return {
    total,
    preDiscountTotal,
    savings: round2(preDiscountTotal - total),
    financing: FIXED_FINANCING,
    countsByStep,
  };
};

export const useCartTotals = (): CartTotals => {
  const { data } = useProducts();
  const entries = useCartStore((s) => s.entries);
  return useMemo(
    () =>
      computeTotals(
        Object.values(entries),
        data?.products ?? [],
        data?.steps ?? [],
      ),
    [entries, data?.products, data?.steps],
  );
};
