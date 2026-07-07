/** Format a number as USD, e.g. 27.98 -> "$27.98". */
export const formatPrice = (value: number): string => `$${value.toFixed(2)}`
