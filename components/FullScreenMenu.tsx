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

export type MenuItem = {
  id: number;
  order?: number;
  parent: number;
  title: string;
  url: string;
  nuxtlink?: string;
  children?: MenuItem[];
};

export type MenuResponse = {
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

function normalizeMenuResponse(data: any): MenuResponse {
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return data as MenuResponse;
  return { items: [] };
}

const flattenLeaves = (nodes: MenuItem[]): MenuItem[] => {
  const out: MenuItem[] = [];
  const seen = new Set<number>();

  const walk = (items: MenuItem[]) => {
    for (const it of sortByOrder(items)) {
      const hasChildren = !!it.children?.length;
      if (hasChildren) walk(it.children!);
      else if (!seen.has(it.id)) {
        seen.add(it.id);
        out.push(it);
      }
    }
  };

  walk(nodes);
  return out;
};

export default function FullScreenMenu({ open, onClose }: Props) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [menuData, setMenuData] = useState<MenuResponse>({ items: [] });

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
        if (!alive) return;
        setMenuData(normalizeMenuResponse(data));
      } catch (e) {
        console.error("Failed to load menu", e);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ✅ top-level (parent === 0)
  const topItems = useMemo(() => {
    const items = menuData?.items ?? [];
    return sortByOrder(items.filter((x) => x.parent === 0));
  }, [menuData]);

  const { dropdownItems, directItems } = useMemo(() => {
    const dropdownItems = topItems.filter((x) => x.children?.length);
    const directItems = topItems.filter((x) => !x.children?.length);
    return { dropdownItems, directItems };
  }, [topItems]);

  // กัน directItems ซ้ำกับ bottomLinks (optional)
  const bottomHrefSet = useMemo(
    () => new Set(bottomLinks.map((x) => x.href)),
    [],
  );

  const directItemsFiltered = useMemo(
    () => directItems.filter((x) => !bottomHrefSet.has(pickHref(x))),
    [directItems, bottomHrefSet],
  );

  // ถ้าปิดเมนูแล้วอยากพับ dropdown ทุกครั้ง
  useEffect(() => {
    if (!open) setOpenMenu(null);
  }, [open]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-[#FAF3E4] backdrop-blur-sm text-black
        transition-all duration-300 ease-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
      `}
    >
      {/* ✅ โครงหลักเป็น flex-col แล้วให้ “content” scroll */}
      <div className="h-full flex flex-col">
        {/* Header (ไม่ scroll) */}
        <div className="h-20 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer z-50"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* Content (scroll ได้แน่นอน) */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Main nav */}
          <nav className="flex flex-col items-center gap-2 pt-2 pb-10">
            {dropdownItems.map((top) => {
              const leaves = flattenLeaves(top.children || []);
              const items = leaves
                .map((it) => ({ label: it.title, href: pickHref(it) }))
                .filter((x) => !!x.href);

              return (
                <DropdownItem
                  key={top.id}
                  label={top.title}
                  items={items}
                  isOpen={openMenu === top.id}
                  onToggle={() => setOpenMenu(openMenu === top.id ? null : top.id)}
                  onItemClick={onClose}
                />
              );
            })}

            {/* top-level ที่ไม่มีลูก → link ตรง */}
            {directItemsFiltered.map((top) => (
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

          {/* strip */}
          <div className="w-full overflow-hidden py-6">
            <div
              className="flex w-max"
              style={{ animation: "menu-scroll 50s linear infinite" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
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

          {/* bottom links */}
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
    </div>
  );
}
