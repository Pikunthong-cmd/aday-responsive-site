export type MenuItem = {
  id: number;
  order?: number;
  parent: number;
  title: string;
  url?: string;
  nuxtlink?: string;
  banner_image?: string | false;
  children?: MenuItem[];
};

export type MenuResponse = {
  items: MenuItem[];
};

export type CategoryCard = {
  category: "shop" | "podcast" | "series";
  title: string;
  image: string;
  href: string;
};

function flattenMenu(items: MenuItem[]): MenuItem[] {
  const out: MenuItem[] = [];
  const walk = (nodes: MenuItem[]) => {
    for (const n of nodes) {
      out.push(n);
      if (n.children?.length) walk(n.children);
    }
  };
  walk(items);
  return out;
}

function normalize(s: string) {
  return (s || "").trim().toLowerCase();
}

function pickHref(item: MenuItem) {
  return item.nuxtlink || item.url || "/";
}

function pickImage(item: MenuItem, fallback: string) {
  return typeof item.banner_image === "string" && item.banner_image
    ? item.banner_image
    : fallback;
}

/**
 * เลือกเมนู 3 ตัวตาม title ใน menu:
 * - match title แบบ case-insensitive
 * - ถ้าไม่เจอ จะ fallback เป็นค่า default ให้ UI ไม่พัง
 */
export function buildCategoryCardsFromMenu(menu: MenuResponse | null): CategoryCard[] {
  const fallbacks: Record<CategoryCard["category"], CategoryCard> = {
    shop: {
      category: "shop",
      title: "Shop",
      image: "/images/category-shop.png",
      href: "/shop",
    },
    podcast: {
      category: "podcast",
      title: "Podcast",
      image: "/images/category-podcast.png",
      href: "/podcast",
    },
    series: {
      category: "series",
      title: "Series",
      image: "/images/category-series.png",
      href: "/category/series",
    },
  };

  if (!menu?.items?.length) {
    return [fallbacks.shop, fallbacks.podcast, fallbacks.series];
  }

  const flat = flattenMenu(menu.items);

  // 🔥 ชื่อที่ต้อง match ใน menu (ตามที่คุณต้องการ)
  const targets: Array<{
    key: CategoryCard["category"];
    matchTitles: string[]; // รองรับหลายชื่อ เผื่อใน menu เขียนไม่เหมือนกัน
  }> = [
    { key: "shop", matchTitles: ["shop"] },
    { key: "podcast", matchTitles: ["podcast"] },
    { key: "series", matchTitles: ["series"] },
  ];

  return targets.map(({ key, matchTitles }) => {
    const found =
      flat.find((it) => matchTitles.includes(normalize(it.title))) || null;

    if (!found) return fallbacks[key];

    return {
      category: key,
      title: found.title, // ✅ เอา title จาก menu
      href: pickHref(found), // ✅ nuxtlink
      image: pickImage(found, fallbacks[key].image), // ✅ banner_image
    };
  });
}
