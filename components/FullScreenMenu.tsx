"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import DropdownItem from "./home/DropdownItem";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FullScreenMenu({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-[#FAF3E4] backdrop-blur-sm text-black
        transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }
      `}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 cursor-pointer"
        aria-label="Close menu"
      >
        <X size={32} />
      </button>

      <nav className="h-full flex flex-col items-center gap-2">
        <DropdownItem
          label="People"
          items={[
            { label: "Team", href: "/people/team" },
            { label: "Community", href: "/people/community" },
          ]}
          onItemClick={onClose}
        />

        <DropdownItem
          label="Art & Design"
          items={[
            { label: "Artwork", href: "/art/artwork" },
            { label: "Exhibition", href: "/art/exhibition" },
          ]}
          onItemClick={onClose}
        />

        <DropdownItem
          label="Life & Culture"
          items={[
            { label: "Lifestyle", href: "/life/lifestyle" },
            { label: "Culture", href: "/life/culture" },
          ]}
          onItemClick={onClose}
        />

        <Link onClick={onClose} href="/contact" className="text-2xl">
          คนสันปก
        </Link>
      </nav>
    </div>
  );
}
