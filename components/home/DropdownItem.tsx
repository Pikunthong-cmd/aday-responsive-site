"use client";

import Link from "next/link";

type Item = {
  label: string;
  href: string;
};

type Props = {
  label: string;
  items: Item[];
  isOpen: boolean;
  onToggle: () => void;
  onItemClick?: () => void;
};

export default function DropdownItem({
  label,
  items,
  isOpen,
  onToggle,
  onItemClick,
}: Props) {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <button
        type="button"
        onClick={onToggle}
        className={`cursor-pointer h1 inline-flex items-center gap-3 select-none transition-colors duration-300 ${
          isOpen ? "text-[#FE552C]" : "text-black"
        }`}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <span
          className={`text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <div
        className={`w-full grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 flex flex-col items-center gap-4 pb-2">
            {items.map((it) => (
              <Link
                key={`${it.href}-${it.label}`}
                href={it.href}
                onClick={onItemClick}
                className="font-medium text-neutral-900/90 hover:text-[#FE552C] transition-all duration-200 hover:scale-[1.06] origin-center"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
``
