"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconMenu, IconSearch } from "../Icon";
import FullScreenMenu from "../FullScreenMenu";
import { themeFromPathname } from "../constants/headerThemeRouteMap";
import { HEADER_THEME_CLASS } from "../constants/headerTheme";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const theme = themeFromPathname(pathname);

  return (
    <header
      className={`
        relative h-[70px] w-full
        transition-colors duration-300
        ${HEADER_THEME_CLASS[theme]}
      `}
    >
      <div className="h-full px-4 md:px-6 lg:px-8 2xl:px-10">
        <div className="h-full flex items-center justify-between">
          <div
            className="
              relative z-10 flex items-center h-full
              pr-6 md:pr-8 lg:pr-10
              before:content-['']
              before:absolute before:inset-y-0
              before:left-[-100vw] before:right-0
              before:bg-black
              before:-z-10
            "
          >
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Logo" width={150} height={40} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="cursor-pointer" aria-label="Search">
              <IconSearch width={28} height={28} />
            </button>

            <button
              className="cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IconMenu width={28} height={28} />
            </button>

            <FullScreenMenu open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
