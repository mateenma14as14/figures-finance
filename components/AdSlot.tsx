type AdSlotProps = {
  position: 'below-result' | 'in-content' | 'sidebar'
  className?: string
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const sizes: Record<AdSlotProps['position'], string> = {
    'below-result': 'h-24 md:h-28',
    'in-content': 'h-24',
    'sidebar': 'h-64',
  }

  return (
    <div
      className={`w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs ${sizes[position]} ${className}`}
      aria-label="Advertisement"
    >
      Ad · {position}
    </div>
  )
}