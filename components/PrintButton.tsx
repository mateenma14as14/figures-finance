'use client'

import { Printer } from 'lucide-react'

export default function PrintButton({ label = 'Print / Save PDF' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-[#10B981] hover:text-[#10B981] transition-colors cursor-pointer"
    >
      <Printer className="w-4 h-4" />
      {label}
    </button>
  )
}