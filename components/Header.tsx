'use client'

import { useState } from "react"
import Image from "next/image";
import { IconMenu, IconSearch } from "./Icon";
import FullScreenMenu from "./FullScreenMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black  h-[70px] w-full">
      <div className="container mx-auto  py-3 flex justify-between items-center">
        <div className="cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={150} height={40} />
        </div>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <IconSearch width={28} height={28} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu width={28} height={28} />
          </div>
          {/* Fullscreen menu */}
          <FullScreenMenu
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
