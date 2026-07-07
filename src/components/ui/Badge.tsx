import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-purple px-2 py-0.5 text-12 font-medium text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
