"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconSearch } from "../Icon";
import FullScreenMenu from "../FullScreenMenu";
import { themeFromPathname } from "../constants/headerThemeRouteMap";
import { HEADER_THEME_CLASS } from "../constants/headerTheme";
import SearchOverlay from "./SearchOverlay";
import HeaderMenuRive from "../HeaderLogoRive";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = usePathname();
  const theme = themeFromPathname(pathname);

  const bgClass = HEADER_THEME_CLASS[theme];

  const darkThemes = [
    "bg-black",
    "bg-[#252872]",
    "bg-[#5F1B13]",
  ];

  const isDarkBg = darkThemes.includes(bgClass);

  const iconColorClass = isDarkBg ? "text-white" : "text-[#FE552C]";

  return (
    <header
      className={`
        relative h-[70px] w-full
        transition-colors duration-300
        ${bgClass}
      `}
    >
      <div className="h-full px-4 md:px-6 lg:px-8 2xl:px-10">
        <div className="flex h-full items-center justify-between">
          {/* LOGO */}
          <div
            className="
              relative z-10 flex h-full items-center
              pr-6 md:pr-8 lg:pr-10
              before:absolute before:inset-y-0
              before:left-[-100vw] before:right-0
              before:-z-10 before:bg-black
              before:content-['']
            "
          >
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Logo" width={150} height={40} />
            </Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className={`cursor-pointer ${iconColorClass}`}
            >
              <IconSearch width={28} height={28} />
            </button>

            {/* MENU */}
            <HeaderMenuRive
              onClick={() => setOpen(true)}
            />

            <FullScreenMenu open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}