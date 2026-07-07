import type { Config } from "tailwindcss";
import { colors, fontSizes, fontFamilies, fontWeights } from "./src/theme/tokens";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontSize: fontSizes,
      fontFamily: fontFamilies,
      fontWeight: fontWeights,
      screens: {
        desktop: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
