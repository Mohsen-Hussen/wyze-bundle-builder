import { create } from "zustand";
import type { CartEntry } from "../types";
import { initialSystem } from "../data/initialSystem";

export const entryKey = (productId: string, variantId?: string): string =>
	variantId ?? productId;

const STORAGE_KEY = "wyze-bundle-builder";

interface Snapshot {
	entries: Record<string, CartEntry>;
	activeVariants: Record<string, string>;
}

interface CartState extends Snapshot {
	getQty: (productId: string, variantId?: string) => number;
	getActiveVariant: (productId: string) => string | undefined;
	setQty: (
		productId: string,
		variantId: string | undefined,
		qty: number,
	) => void;
	increment: (productId: string, variantId?: string) => void;
	decrement: (productId: string, variantId?: string) => void;
	setActiveVariant: (productId: string, variantId: string) => void;
	reset: (entries?: CartEntry[]) => void;
	/** Persist the current configuration to localStorage (manual save). */
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
		const parsed = JSON.parse(raw) as Partial<Snapshot>;
		if (parsed && typeof parsed === "object" && parsed.entries) {
			return {
				entries: parsed.entries,
				activeVariants: parsed.activeVariants ?? {},
			};
		}
	} catch {
		// ignore malformed storage
	}
	return null;
};

const initialSnapshot = loadSaved() ?? buildState(initialSystem);

export const useCartStore = create<CartState>()((set, get) => ({
	entries: initialSnapshot.entries,
	activeVariants: initialSnapshot.activeVariants,

	getQty: (productId, variantId) =>
		get().entries[entryKey(productId, variantId)]?.quantity ?? 0,

	getActiveVariant: (productId) => get().activeVariants[productId],

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

	increment: (productId, variantId) =>
		get().setQty(productId, variantId, get().getQty(productId, variantId) + 1),

	decrement: (productId, variantId) =>
		get().setQty(productId, variantId, get().getQty(productId, variantId) - 1),

	setActiveVariant: (productId, variantId) =>
		set((state) => ({
			activeVariants: { ...state.activeVariants, [productId]: variantId },
		})),

	reset: (list = initialSystem) => set(() => buildState(list)),

	saveForLater: () => {
		if (typeof localStorage === "undefined") return;
		const { entries, activeVariants } = get();
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ entries, activeVariants }),
		);
	},
}));
