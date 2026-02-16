import { HEADER_THEME_CLASS, type HeaderTheme } from "./headerTheme";

const defineSlugTheme = <T extends Record<string, HeaderTheme>>(m: T) => m;

const SLUG_THEME = defineSlugTheme({
  "artist-talk": "artist-talk",
  "draft-till-done": "draft-till-done",
  "what-a-day": "what-a-day",
  portfolio: "portfolio",
  "behind-the-ศิลป์": "behind-the-art",
  "outstallation-art": "outstation-art",

  "a-day-update": "a-day-update",
  "event-update": "event-update",
  "photo-stories": "photo-stories",
  agenda: "agenda",
  "live-in-a-day": "live-in-a-day",
  "a-doc": "a-doc",
  heartsell: "heartsell",

  "q-and-a-day-interview": "q-and-a-day-interview",
  "people-power-life": "people-power-life",
  founder: "founder",

  "a-better-day": "a-better-day",
  "crackracter-branding": "crackracter-branding",
  "made-my-green": "made-my-green",
  "once-upon-a-song": "once-upon-a-song",
  "see-saw-scene": "see-saw-scene",
  "witch-a-boo": "witch-a-boo",

  "ที่ชอบ": "ที่ชอบ",
  "เจอนั่นที่ย่านนี้-journey-ที่ย": "เจอนั่นที่ย่านนี้-journey-ที่ย",
  "บันทึกการอ่าน": "บันทึกการอ่าน",
  "ของที่รฤก": "ของที่รฤก",
  "ตามไปดู": "ตามไปดู",
} as const);

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function normalizePathname(pathname: string) {
  const p = pathname.split("?")[0].split("#")[0];
  const clean = p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;
  return safeDecode(clean);
}

function firstSegmentAfter(path: string, base: string) {
  if (!path.startsWith(base)) return "";
  return path.slice(base.length).split("/")[0] || "";
}

function ensureTheme(t: HeaderTheme): HeaderTheme {
  return t in HEADER_THEME_CLASS ? t : "default";
}

function matchThemeInAnySegment(path: string): HeaderTheme | null {
  // แยก path เป็น segments แบบชัวร์ (กัน false-positive)
  const segments = path.split("/").filter(Boolean);
  if (!segments.length) return null;

  // ให้ match แบบ “ยาวก่อน” กันเคส slug ซ้อนกัน
  const keys = Object.keys(SLUG_THEME).sort((a, b) => b.length - a.length);

  // 1) match แบบ segment เท่ากันก่อน (แม่นสุด)
  const segSet = new Set(segments);
  for (const k of keys) {
    if (segSet.has(k)) return ensureTheme(SLUG_THEME[k as keyof typeof SLUG_THEME]);
  }

  // 2) เผื่อบาง route มี slug อยู่ใน segment เดียวกัน (เช่น prefix/suffix)
  // ใช้ boundary check: (^|-)slug($|-)
  for (const k of keys) {
    const re = new RegExp(`(^|-)${escapeRegExp(k)}($|-)`, "i");
    if (segments.some((s) => re.test(s))) {
      return ensureTheme(SLUG_THEME[k as keyof typeof SLUG_THEME]);
    }
  }

  return null;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function themeFromPathname(pathname: string): HeaderTheme {
  const p = normalizePathname(pathname);

  // 1) เฉพาะกรณีที่รู้ base แน่ ๆ
  for (const base of ["/category/", "/series/", "/video/"] as const) {
    const slug = firstSegmentAfter(p, base);
    if (slug && slug in SLUG_THEME) {
      return ensureTheme(SLUG_THEME[slug as keyof typeof SLUG_THEME]);
    }
  }

  // 2) top segment ตรง ๆ
  const top = p.split("/")[1] || "";
  if (top && top in SLUG_THEME) {
    return ensureTheme(SLUG_THEME[top as keyof typeof SLUG_THEME]);
  }

  // 3) ค้นหาจาก “ทุก segment” ใน path
  const any = matchThemeInAnySegment(p);
  if (any) return any;

  // 4) fallback rules ตามหมวดโฟลเดอร์
  if (p.startsWith("/experiences/creative")) return "draft-till-done";
  if (p.startsWith("/experiences/life")) return "what-a-day";
  if (p.startsWith("/experiences/style")) return "portfolio";

  return "default";
}
