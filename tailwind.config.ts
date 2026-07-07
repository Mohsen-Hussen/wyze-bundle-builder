import type { Config } from 'tailwindcss'
import { colors, fontSizes, fontFamilies, fontWeights } from './src/theme/tokens'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontSize: fontSizes,
      fontFamily: fontFamilies,
      fontWeight: fontWeights,
    },
  },
  plugins: [],
} satisfies Config
