# Wyze Security System Builder

A single-page, 4-step product configurator with a live order summary, built as a
frontend take-home. Shoppers assemble a security system (cameras, plan, sensors,
extra protection) and watch a review panel update in real time as they change
selections.

---

## Getting started

Requires **Node 20.19+ or 22+** (Vite 8) and npm.

```bash
git clone <repo-url>
cd wyze-bundle-builder
npm install

npm run dev       # start the dev server -> http://localhost:5173
npm run build     # type-check + production build -> dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

It builds and runs from a clean clone with no extra setup. Two sets of assets are
optional placeholders (the app runs without them, see **Assets** below):

- **Gilroy fonts** (licensed) — drop the `.woff2` files into `public/fonts/`.
  Until then the app falls back to Poppins / system-ui.
- **Product images / step icons** — SVGs/PNGs live in `public/images/`.

---

## What it does

- **4-step accordion builder** (cameras / plan / sensors / extra protection).
  One panel open at a time; Step 1 open on load; each header shows a
  "STEP X OF 4" eyebrow, an icon, the title, and an "N selected" counter. Every
  step renders its category's products as pickable cards and ends with a
  "Next: …" button that advances to the following step.
- **Product cards** with discount badge, image, description + Learn More, a
  colour/variant selector, a quantity stepper, and pricing. A card with any
  quantity shows the selected (purple-border) state; required items (the Sense
  Hub) show a disabled stepper.
- **Per-variant quantities** — each colour of a product tracks its own quantity
  independently; the card's single stepper is bound to the active colour (see
  the model below).
- **Live review panel** ("Your security system") grouped by category, with
  synced steppers, a shipping row, a satisfaction seal, financing line, total
  (with the pre-discount price struck through), savings callout, a Checkout
  button (confirmation modal), and a "Save my system for later" link.
- **Persistence** — "Save my system for later" writes the configuration to
  localStorage; it is restored exactly on reload.
- **Responsive** — desktop 5-column grid with the summary below (review +
  checkout side by side); narrower viewports collapse to a summary sidebar /
  stacked layout with a "Let's get started!" title on mobile.

---

## Tech stack

- **React 19 + TypeScript + Vite** (React Compiler enabled via
  `babel-plugin-react-compiler`).
- **Tailwind CSS** with a centralized theme — colours, font families, font-size
  scale, and weights are design tokens in `src/theme/tokens.ts`, wired into
  `tailwind.config.ts` and mirrored as CSS variables in `src/styles/globals.css`.
- **Zustand** for cart state (per-variant quantities + manual persistence).
- **TanStack Query** loads the local products JSON through a single query hook
  (keeps the door open for a real backend).
- **Radix UI** (accordion), **lucide-react** (icons), **clsx + tailwind-merge**
  (`cn()` helper).

---

## Project structure

```
wyze-bundle-builder/
├── public/
│   ├── fonts/                    # Gilroy .woff2 files go here (licensed; README placeholder)
│   ├── images/
│   │   ├── icons/                # step-cameras / step-plan / step-sensors / step-protection .svg
│   │   └── products/             # product PNGs + cam-unlimited.svg, guarantee-seal.svg, carbon_delivery.svg
│   └── favicon.svg
├── src/
│   ├── main.tsx                  # QueryClientProvider + root render
│   ├── App.tsx                   # responsive layout shell
│   ├── api/
│   │   └── products.ts           # fetchProducts() -> Catalog (swap for a backend later)
│   ├── components/
│   │   ├── builder/              # BuilderAccordion, StepHeader, ProductStep, ProductCard, VariantSelector
│   │   ├── review/               # SummaryPanel, ReviewPanel, ReviewLine, CheckoutBlock, CheckoutConfirmation
│   │   └── ui/                   # Badge, Button, Chevron, ColorChip, Stepper, index.ts
│   ├── data/
│   │   ├── products.json         # catalog: products, variants, categories, steps, shipping
│   │   └── initialSystem.ts      # seeded cart so first load matches the design
│   ├── hooks/
│   │   ├── useProducts.ts        # TanStack Query hook
│   │   ├── useCartTotals.ts      # derived total / pre-discount / savings / per-step counts
│   │   ├── useReviewItems.ts     # groups the cart by category for the review panel
│   │   ├── useReviewLine.ts      # per-line review derivations
│   │   ├── useProductCard.ts     # card state (active variant, qty, selected, pricing)
│   │   └── useCheckoutItems.ts   # flat item list for the confirmation modal
│   ├── store/
│   │   └── cartStore.ts          # Zustand cart: per-variant quantities + saveForLater
│   ├── theme/
│   │   └── tokens.ts             # single source of design tokens
│   ├── styles/
│   │   └── globals.css           # @font-face, CSS vars, Tailwind directives
│   ├── types/
│   │   └── index.ts              # Product, Variant, Category, CartEntry, Step, Pricing
│   └── utils/
│       ├── cn.ts                 # clsx + tailwind-merge
│       └── format.ts             # currency formatting
├── index.html
├── tailwind.config.ts            # tokens wired into theme.extend + `desktop` breakpoint
├── postcss.config.js
├── vite.config.ts                # React plugin + React Compiler
├── eslint.config.js
├── tsconfig.json                 # + tsconfig.app.json / tsconfig.node.json
└── package.json
```

---

## The variant model (the important part)

Cart state lives in `src/store/cartStore.ts` and is keyed so every colour is its
own line:

- **`entries: Record<key, CartEntry>`** where `key = ${productId}::${variantId}`.
  Each colour of a product is an independent entry with its own quantity;
  products without variants are a single entry keyed by product id.
- **`activeVariants: Record<productId, variantId>`** — which colour is currently
  selected per product. A card's single stepper is bound to the active variant.

So: add 2× White, switch the card to Black, and the stepper reads 0 (Black's
count) while the 2× White stay untouched — and the review panel lists every
variant with a count above zero as its own line. Totals, savings, and the
per-step "N selected" counts are derived from this state in `useCartTotals`
(counts are by **distinct product**, so two colours of one product count once).

---

## Data & pricing

Everything renders from `src/data/products.json` — no per-product markup is
hardcoded. `src/data/initialSystem.ts` seeds the cart so the first load matches
the design (including the pre-populated sensors/accessory/plan). The seed
reconciles exactly to the design's headline numbers: **total $187.89,
pre-discount $238.81, savings $50.92**.

---

## Decisions & tradeoffs

- **One unit price per product.** The source design was internally inconsistent
  for the Wyze Cam Pan v3 (card showed ~$34.98, but the review + totals imply a
  ~$23.99 unit). I chose the single unit price that makes every review line and
  all three headline totals reconcile exactly; the Pan v3 card reflects that unit.
- **Fixed financing figure.** "As low as $19.19/mo" does not divide cleanly from
  the total, so it is shown as a fixed design value rather than derived.
- **Manual persistence instead of Zustand's `persist` middleware.** The
  requirement is to save **only** when "Save my system for later" is clicked;
  `persist` auto-writes on every state change, so a small explicit
  read-on-init / write-on-save (`saveForLater`) is used instead. The saved
  snapshot carries a `version` and is discarded on mismatch.
- **Vertical cards at every breakpoint.** The spec suggested horizontal cards on
  tablet, but inside the narrow builder column (beside the sticky summary
  sidebar) they overflow. A responsive vertical-card grid (1 / 2 / 5 columns)
  stays clean and usable at every width.
- **React Compiler** handles memoization, so manual `useMemo`/`useCallback` is
  avoided except where a stable reference is genuinely needed.

---

## Known limitations / not finished

- **Assets are placeholders.** Gilroy `.woff2` files (licensed) and some product
  imagery need to be supplied; the app runs with fallbacks in the meantime.
