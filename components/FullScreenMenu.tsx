"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import DropdownItem from "./home/DropdownItem";
import { menuAPI } from "@/src/api/menu";

type Props = {
  open: boolean;
  onClose: () => void;
};

type MenuItem = {
  id: number;
  order: number;
  parent: number;
  title: string;
  url: string;
  nuxtlink?: string;
  children?: MenuItem[];
};

type MenuResponse = {
  items: MenuItem[];
};

const bottomLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Support us", href: "/support-us" },
  { label: "Magazine", href: "/magazine" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Podcast", href: "/podcast" },
  { label: "Video", href: "/video" },
  { label: "About", href: "/about" },
];

const pickHref = (item: MenuItem) => item.nuxtlink || item.url;

const sortByOrder = <T extends { order?: number }>(arr: T[]) =>
  [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const flattenAllDescendants = (nodes: MenuItem[]): MenuItem[] => {
  const out: MenuItem[] = [];
  const walk = (items: MenuItem[]) => {
    for (const it of sortByOrder(items)) {
      out.push(it);
      if (it.children?.length) walk(it.children);
    }
  };
  walk(nodes);
  return out;
};

export default function FullScreenMenu({ open, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);

  // lock scroll (body) ตอนเปิดเมนู
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // fetch menu
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await menuAPI.getAll();
        if (alive) setMenuData(data);
      } catch (e) {
        console.error("Failed to load menu", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const topItems = useMemo(() => {
    const items = menuData?.items ?? [];
    return sortByOrder(items.filter((x) => x.parent === 0));
  }, [menuData]);

  const { dropdownItems, directItems } = useMemo(() => {
    const dropdownItems = topItems.filter((x) => x.children?.length);
    const directItems = topItems.filter((x) => !x.children?.length);
    return { dropdownItems, directItems };
  }, [topItems]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-[#FAF3E4] backdrop-blur-sm text-black
        transition-all duration-300 ease-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
      `}
    >
      {/* ✅ ให้ทั้ง overlay เป็นตัว scroll */}
      <div
        className="h-full overflow-y-auto overscroll-contain scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* ✅ ปุ่มปิดลอย แต่ไม่ทับ content แบบงง ๆ */}
        <div className="sticky top-0 z-50">
          <div className="relative h-20">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col items-center gap-2 pt-6 pb-10">
          {dropdownItems.map((top) => {
            const allInside = flattenAllDescendants(top.children || []);
            const items = allInside.map((it) => ({
              label: it.title,
              href: pickHref(it),
            }));

            return (
              <DropdownItem
                key={top.id}
                label={top.title}
                items={items}
                isOpen={openMenu === top.id}
                onToggle={() =>
                  setOpenMenu(openMenu === top.id ? null : top.id)
                }
                onItemClick={onClose}
              />
            );
          })}

          {/* top-level ที่ไม่มีลูก → link ตรง */}
          {directItems.map((top) => (
            <Link
              key={top.id}
              href={pickHref(top)}
              onClick={onClose}
              className="h1"
            >
              {top.title}
            </Link>
          ))}
        </nav>

        <div className="w-full overflow-hidden py-6">
          <div
            className="flex w-max"
            style={{ animation: "menu-scroll 50s linear infinite" }}
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

        <div className="w-full flex flex-wrap justify-center gap-6 pb-10">
          {bottomLinks.map((item) => (
            <Link
              key={`bottom-${item.href}`}
              onClick={onClose}
              href={item.href}
              className="text-2xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
