"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import DropdownItem from "./home/DropdownItem";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FullScreenMenu({ open, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

      <nav className="h-full flex flex-col items-center gap-2 mt-30">
        <DropdownItem
          label="People"
          items={[
            { label: "Team", href: "/people/team" },
            { label: "Community", href: "/people/community" },
          ]}
          isOpen={openMenu === "people"}
          onToggle={() => setOpenMenu(openMenu === "people" ? null : "people")}
          onItemClick={onClose}
        />

        <DropdownItem
          label="Art & Design"
          items={[
            { label: "Artwork", href: "/art/artwork" },
            { label: "Exhibition", href: "/art/exhibition" },
          ]}
          isOpen={openMenu === "art"}
          onToggle={() => setOpenMenu(openMenu === "art" ? null : "art")}
          onItemClick={onClose}
        />

        <DropdownItem
          label="Life & Culture"
          items={[
            { label: "Lifestyle", href: "/life/lifestyle" },
            { label: "Culture", href: "/life/culture" },
          ]}
          isOpen={openMenu === "life"}
          onToggle={() => setOpenMenu(openMenu === "life" ? null : "life")}
          onItemClick={onClose}
        />

        <Link onClick={onClose} href="/contact" className="h1">
          คนสันปก
        </Link>
      </nav>

      {/* Scrolling Image Strip */}
      <div className="absolute bottom-35 left-0 w-full overflow-hidden py-6">
        <div
          className="flex w-max"
          style={{
            animation: "menu-scroll 50s linear infinite",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          <img
            src="/images/menu-strip.png"
            alt="Menu strip"
            className="h-40 object-cover select-none pointer-events-none"
          />
          <img
            src="/images/menu-strip.png"
            alt=""
            className="h-40 object-cover select-none pointer-events-none"
          />
        </div>
      </div>

      <div className="absolute bottom-20 left-0 w-full flex flex-wrap justify-center gap-6">
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Shop
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Support us
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Magazine
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Newsletters
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Podcast
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          Video
        </Link>
        <Link onClick={onClose} href="/contact" className="text-2xl">
          About
        </Link>
      </div>
    </div>
  );
}
