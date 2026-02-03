"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "./SectionContainer";
import { IconMenu, IconSearch } from "../Icon";
import FullScreenMenu from "../FullScreenMenu";


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black  h-[70px] w-full">
      <SectionContainer fullWidth={false}>
        <div className="container mx-auto  py-3 flex justify-between items-center">
          <Link href="/" className="cursor-pointer inline-block">
            <Image src="/logo.png" alt="Logo" width={150} height={40} />
          </Link>
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
            <FullScreenMenu open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}
