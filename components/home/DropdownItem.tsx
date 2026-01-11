'use client'

import Link from 'next/link'
import { IconCaretDown } from '../Icon'

type Props = {
  label: string
  items: { label: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
  onItemClick?: () => void
}

export default function DropdownItem({
  label,
  items,
  isOpen,
  onToggle,
  onItemClick,
}: Props) {
  return (
    <div className="w-full text-center">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center gap-2 h1 text-black cursor-pointer"
      >
        <span>{label}</span>

        {/* Icon */}
        <span
          className={`
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}
        >
          <IconCaretDown />
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${
            isOpen
              ? 'max-h-40 opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-2'
          }
        `}
      >
        <div className="flex flex-col gap-2 pt-3 text-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
