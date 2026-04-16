'use client'

import { useState } from 'react'

type InputFieldProps = {
  label: string
  prefix?: string
  suffix?: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  decimals?: number
  readOnly?: boolean
  slider?: boolean
  tooltip?: string
}

export default function InputField({
  label, prefix, suffix, value, onChange,
  min, max, step, decimals = 0, readOnly = false, slider = false, tooltip,
}: InputFieldProps) {
  const [showTip, setShowTip] = useState(false)

  const handleChange = (raw: string) => {
    const parsed = parseFloat(parseFloat(raw).toFixed(decimals))
    onChange(isNaN(parsed) ? 0 : parsed)
  }

  return (
    <div>
      {label && (
        <div className="flex items-center gap-1 mb-1">
          <label className="block text-sm font-medium text-slate-700">{label}</label>
          {tooltip && (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
                onFocus={() => setShowTip(true)}
                onBlur={() => setShowTip(false)}
                className="w-4 h-4 rounded-full bg-slate-300 text-slate-600 text-[10px] font-bold flex items-center justify-center cursor-help hover:bg-slate-400 transition-colors"
                aria-label="More information"
              >
                ?
              </button>
              {showTip && (
                <div className="absolute left-6 top-0 z-20 w-56 bg-[#0F172A] text-white text-xs rounded-lg px-3 py-2 shadow-xl leading-relaxed">
                  {tooltip}
                  <div className="absolute -left-1.5 top-2 w-2.5 h-2.5 bg-[#0F172A] rotate-45" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className={`flex items-center border rounded-lg px-3 py-2 ${
        readOnly
          ? 'bg-slate-100 border-slate-200'
          : 'bg-white border-slate-300 focus-within:ring-2 focus-within:ring-[#10B981]'
      }`}>
        {prefix && <span className="text-slate-400 mr-1 text-sm">{prefix}</span>}
        <input
          type="number"
          className="flex-1 outline-none bg-transparent text-slate-800 text-sm min-w-0"
          value={value}
          readOnly={readOnly}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handleChange(e.target.value)}
        />
        {suffix && <span className="text-slate-400 ml-1 text-sm">{suffix}</span>}
      </div>
      {slider && !readOnly && (
        <input
          type="range"
          className="w-full mt-2 accent-[#10B981] h-1.5 cursor-pointer"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  )
}