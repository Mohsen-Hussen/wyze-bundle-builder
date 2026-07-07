import { create } from 'zustand'
import type { CartEntry } from '../types'
import { initialSystem } from '../data/initialSystem'

export const entryKey = (productId: string, variantId?: string): string =>
  variantId ?? productId

interface CartState {
  entries: Record<string, CartEntry>
  activeVariants: Record<string, string>
  getQty: (productId: string, variantId?: string) => number
  getActiveVariant: (productId: string) => string | undefined
  setQty: (productId: string, variantId: string | undefined, qty: number) => void
  increment: (productId: string, variantId?: string) => void
  decrement: (productId: string, variantId?: string) => void
  setActiveVariant: (productId: string, variantId: string) => void
  reset: (entries?: CartEntry[]) => void
}

const buildState = (list: CartEntry[]) => {
  const entries: Record<string, CartEntry> = {}
  const activeVariants: Record<string, string> = {}
  for (const e of list) {
    if (e.quantity <= 0) continue
    entries[entryKey(e.productId, e.variantId)] = { ...e }
    if (e.variantId) activeVariants[e.productId] = e.variantId
  }
  return { entries, activeVariants }
}

export const useCartStore = create<CartState>()((set, get) => ({
  ...buildState(initialSystem),

  getQty: (productId, variantId) =>
    get().entries[entryKey(productId, variantId)]?.quantity ?? 0,

  getActiveVariant: (productId) => get().activeVariants[productId],

  setQty: (productId, variantId, qty) =>
    set((state) => {
      const key = entryKey(productId, variantId)
      const entries = { ...state.entries }
      if (qty <= 0) {
        delete entries[key]
      } else {
        entries[key] = { productId, variantId, quantity: qty }
      }
      return { entries }
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
}))
