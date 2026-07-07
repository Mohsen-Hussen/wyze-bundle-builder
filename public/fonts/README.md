# Gilroy fonts

The design uses **Gilroy** (a licensed font). Place the following `.woff2` files
here so `@font-face` in `src/styles/globals.css` can load them:

- `Gilroy-Regular.woff2`  (weight 400)
- `Gilroy-Medium.woff2`   (weight 500)
- `Gilroy-SemiBold.woff2` (weight 600)
- `Gilroy-Bold.woff2`     (weight 700)

Until these are supplied, the app falls back to `Poppins`, then `system-ui`.
