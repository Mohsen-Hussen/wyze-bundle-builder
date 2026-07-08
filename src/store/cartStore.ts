import { create } from "zustand";
import type { CartEntry } from "../types";
import { initialSystem } from "../data/initialSystem";

export const entryKey = (productId: string, variantId?: string): string =>
  `${productId}::${variantId ?? ""}`;

const STORAGE_KEY = "wyze-bundle-builder";
const STORAGE_VERSION = 1;

interface Snapshot {
  entries: Record<string, CartEntry>;
  activeVariants: Record<string, string>;
}

interface StoredSnapshot extends Snapshot {
  version: number;
}

interface CartState extends Snapshot {
  setQty: (
    productId: string,
    variantId: string | undefined,
    qty: number,
  ) => void;
  increment: (productId: string, variantId?: string) => void;
  decrement: (productId: string, variantId?: string) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  saveForLater: () => void;
}

const buildState = (list: CartEntry[]): Snapshot => {
  const entries: Record<string, CartEntry> = {};
  const activeVariants: Record<string, string> = {};
  for (const e of list) {
    if (e.quantity <= 0) continue;
    entries[entryKey(e.productId, e.variantId)] = { ...e };
    if (e.variantId) activeVariants[e.productId] = e.variantId;
  }
  return { entries, activeVariants };
};

const loadSaved = (): Snapshot | null => {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSnapshot>;
    if (parsed?.version !== STORAGE_VERSION || !parsed.entries) return null;
    return {
      entries: parsed.entries,
      activeVariants: parsed.activeVariants ?? {},
    };
  } catch {
    // ignore malformed / unreadable storage
    return null;
  }
};

const initialSnapshot = loadSaved() ?? buildState(initialSystem);

export const useCartStore = create<CartState>()((set, get) => ({
  entries: initialSnapshot.entries,
  activeVariants: initialSnapshot.activeVariants,

  setQty: (productId, variantId, qty) =>
    set((state) => {
      const key = entryKey(productId, variantId);
      const entries = { ...state.entries };
      if (qty <= 0) {
        delete entries[key];
      } else {
        entries[key] = { productId, variantId, quantity: qty };
      }
      return { entries };
    }),

  increment: (productId, variantId) => {
    const current =
      get().entries[entryKey(productId, variantId)]?.quantity ?? 0;
    get().setQty(productId, variantId, current + 1);
  },

  decrement: (productId, variantId) => {
    const current =
      get().entries[entryKey(productId, variantId)]?.quantity ?? 0;
    get().setQty(productId, variantId, current - 1);
  },

  setActiveVariant: (productId, variantId) =>
    set((state) => ({
      activeVariants: { ...state.activeVariants, [productId]: variantId },
    })),

  saveForLater: () => {
    if (typeof localStorage === "undefined") return;
    try {
      const { entries, activeVariants } = get();
      const payload: StoredSnapshot = {
        version: STORAGE_VERSION,
        entries,
        activeVariants,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore write failures
    }
  },
}));
