"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import DropdownItem from "./home/DropdownItem";
import { menuAPI } from "@/src/api/menu";
import { IconFacebook, IconIG, IconSpotify, IconTwiiter, IconYoutube } from "./Icon";


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
  { label: "Magazine", href: "/a-day-magazine" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Podcast", href: "/podcast" },
  { label: "Video", href: "/video" },
  { label: "About Us", href: "/about-us" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/adaymagazine",
    Icon: IconFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adaymagazine/",
    Icon: IconIG,
  },
  {
    label:
      "https://open.spotify.com/show/5hOCAyn56XoSkLq0PyoreZ?si=8d267bdf705243cf",
    href: "https://open.spotify.com/show/5hOCAyn56XoSkLq0PyoreZ?si=8d267bdf705243cf",
    Icon: IconSpotify,
  },
  {
    label: "X",
    href: "http://twitter.com/adaymagazine",
    Icon: IconTwiiter,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@adaymagazinechannel",
    Icon: IconYoutube,
  },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  const topItems = useMemo(() => {
    const items = menuData?.items ?? [];
    return sortByOrder(items.filter((x) => x.parent === 0));
  }, [menuData]);

  const { dropdownItems, directItems } = useMemo(() => {
    const dropdownItems = topItems.filter((x) => x.children?.length);
    const directItems = topItems.filter((x) => !x.children?.length);
    return { dropdownItems, directItems };
  }, [topItems]);

  const bottomHrefSet = useMemo(
    () => new Set(bottomLinks.map((x) => x.href)),
    []
  );

  const directItemsFiltered = useMemo(
    () => directItems.filter((x) => !bottomHrefSet.has(pickHref(x))),
    [directItems, bottomHrefSet]
  );

  useEffect(() => {
    if (!open) setOpenMenu(null);
  }, [open]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-[#FAF3E4] text-black backdrop-blur-sm
        transition-all duration-300 ease-out
        ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }
      `}
    >
      <div className="flex h-full flex-col">
        <div className="relative h-20 shrink-0">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-50 cursor-pointer"
            aria-label="Close menu"
            type="button"
          >
            <X size={32} />
          </button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <nav className="flex flex-col items-center gap-2 pb-10 pt-2">
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
                  onToggle={() =>
                    setOpenMenu(openMenu === top.id ? null : top.id)
                  }
                  onItemClick={onClose}
                />
              );
            })}

            {directItemsFiltered.map((top) => (
              <Link
                key={top.id}
                href={pickHref(top)}
                onClick={onClose}
                className="h1 lowercase"
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
                className="h-40 select-none object-cover pointer-events-none"
              />
              <img
                src="/images/menu-strip.png"
                alt=""
                className="h-40 select-none object-cover pointer-events-none"
              />
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-6 pb-10">
            {bottomLinks.map((item) => (
              <Link
                key={`bottom-${item.href}`}
                onClick={onClose}
                href={item.href}
                className="text-2xl transition-colors duration-200 hover:text-[#FE552C]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex w-full justify-center gap-6 pb-14 pt-2">
            {socialLinks.map((item) => {
              const Icon = item.Icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="transition-all duration-200 hover:scale-110 hover:text-[#FE552C]"
                >
                  <Icon width={26} height={26} fill="black"/>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}