export const colors = {
  purple: '#4E2FD2', // Primary purple - buttons, active borders, prices, links, save badges
  purple70: 'rgba(78, 47, 210, 0.7)', // Primary purple @ 70% - hover / translucent overlay
  panelBlue: '#EDF4FF', // Panel blue (light) - section background panels
  blueTint: '#E7EFFD', // Light blue tint - secondary light panels / rows
  green: '#0AA288', // Success green - savings text, FREE labels, shipping icon
  mintTint: 'rgba(29, 240, 187, 0.04)', // Mint tint @ 4% - faint highlight
  saleRed: '#D8392B', // Sale red - original struck-through prices (card grid)
  linkBlue: '#0000EE', // Link blue - default-style text links
  accentBlue: '#0046C7', // Accent blue - selected swatch / accent links
  ink: '#1F1F1F', // Text primary - headings, body
  inkBlack: '#0B0D10', // Text primary (near-black) - deep text / icons
  muted: '#6F7882', // Text muted - descriptions, labels, STEP labels
  slate: '#525963', // Text slate - muted slate text
  grey: '#484848', // Text grey
  grey2: '#575757', // Text grey (secondary)
  mutedGrey: '#A8B2BD', // Muted grey - secondary labels
  borderGrey: '#CED6DE', // Border grey - card borders, dividers
  dividerLight: '#E6EBF0', // Divider light - row dividers / light backgrounds
  fillGrey: '#F0F0F0', // Light grey fill
  fillGrey2: '#F1F1F2', // Light grey fill (alt)
  inputFill: '#F0F4F7', // Input fill - input / light panel fill
  disabled: '#CCCCCC', // Disabled grey - muted borders / disabled
  white: '#FFFFFF', // White - card backgrounds
  black: '#000000', // Black - shadows
} as const

export const fontSizes = {
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '22': '22px',
  '24': '24px',
  '26': '26px',
  '28': '28px',
  '30': '30px',
} as const

/**
 * Font families. Gilroy is the design font (licensed - drop .woff2 files into
 * public/fonts/). Poppins + system fonts are the fallback stack until then.
 * Typed as string[] (not `as const`) so the arrays stay mutable for Tailwind's
 * fontFamily config type.
 */
export const fontFamilies: Record<string, string[]> = {
  sans: ['Gilroy', 'Poppins', 'system-ui', 'sans-serif'],
  gilroy: ['Gilroy', 'Poppins', 'system-ui', 'sans-serif'],
}

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const tokens = {
  colors,
  fontSizes,
  fontFamilies,
  fontWeights,
}

export default tokens
