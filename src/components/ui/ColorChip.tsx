import { cn } from '../../utils/cn'

interface ColorChipProps {
  label: string
  swatch?: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export const ColorChip = ({ label, swatch, active = false, onClick, className }: ColorChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-12 font-medium transition-colors',
        active ? 'border-purple text-ink' : 'border-borderGrey text-slate',
        className,
      )}
    >
      <span
        className="h-3.5 w-3.5 rounded-full border border-borderGrey"
        style={{ backgroundColor: swatch }}
      />
      {label}
    </button>
  )
}
