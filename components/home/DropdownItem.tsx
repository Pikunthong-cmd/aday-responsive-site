'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconCaretDown } from '../Icon'


type Props = {
  label: string
  items: { label: string; href: string }[]
  onItemClick?: () => void
}

export default function DropdownItem({ label, items, onItemClick }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full text-center">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 text-2xl text-black cursor-pointer"
      >
        <span>{label}</span>
        <span
          className={`
            transition-transform duration-300
            ${open ? 'rotate-180' : ''}
          `}
        >
          <IconCaretDown />
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${open ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
        `}
      >
        <div className="flex flex-col gap-2 pt-3 text-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
