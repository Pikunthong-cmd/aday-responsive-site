export type EventTag = {
  id: number;
  name: string;
  slug?: string;
};

export type RelatedItem = {
  id: number;
  title: string;
  thumbnail?: string;
  nuxtlink?: string;
  link?: string;
  author_detail?: { name?: string };
  primary_category?: Array<{ nicename?: string }>;
};

export type EventHomePost = {
  id: number;
  related?: RelatedItem[];
};

export type EventCard = {
  id: number;
  href: string;
  image: string;
  place: string;
  title: string;
  subject: string;
};

function normalize(s: string) {
  return (s || "").trim().toLowerCase();
}

export function findEventTagId(tags: EventTag[]): number | null {
  // หา tag ที่เป็น event (รองรับทั้ง name และ slug)
  const t =
    tags.find((x) => normalize(x.slug || "") === "event") ||
    tags.find((x) => normalize(x.name || "") === "event");
  return t?.id ?? null;
}

function pickHref(r: RelatedItem) {
  return r.nuxtlink || r.link || "/";
}

function pickPlace(r: RelatedItem) {
  return r.primary_category?.[0]?.nicename || "";
}

function pickSubject(r: RelatedItem) {
  return r.author_detail?.name || "";
}

export function mapRelatedToEventCards(posts: EventHomePost[], limit = 3): EventCard[] {
  const relatedAll: RelatedItem[] = (posts || []).flatMap((p) => p.related || []);

  const seen = new Set<number>();
  const uniq = relatedAll.filter((r) => {
    if (!r?.id) return false;
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  return uniq
    .map((r) => ({
      id: r.id,
      href: pickHref(r),
      image: r.thumbnail || "",
      place: pickPlace(r),
      title: r.title || "",
      subject: pickSubject(r),
    }))
    .filter((x) => !!x.image && !!x.href && !!x.title)
    .slice(0, limit);
}
