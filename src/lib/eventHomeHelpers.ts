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
  author_detail?: {
    id?: number;
    name?: string;
    nuxtlink?: string;
  };
  primary_category?: Array<{
    nicename?: string;
    name?: string;
    nuxtlink?: string;
  }>;
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
  placeHref: string;
  title: string;
  subject: string;
  subjectHref: string;
};

function normalize(s: string) {
  return (s || "").trim().toLowerCase();
}

export function findEventTagId(tags: EventTag[]): number | null {
  const t =
    tags.find((x) => normalize(x.slug || "") === "event") ||
    tags.find((x) => normalize(x.name || "") === "event");
  return t?.id ?? null;
}

function pickHref(r: RelatedItem) {
  return r.nuxtlink || r.link || "/";
}

function pickPlace(r: RelatedItem) {
  return r.primary_category?.[0]?.nicename || r.primary_category?.[0]?.name || "";
}

function pickPlaceHref(r: RelatedItem) {
  return r.primary_category?.[0]?.nuxtlink || "#";
}

function pickSubject(r: RelatedItem) {
  return r.author_detail?.name || "";
}

function pickSubjectHref(r: RelatedItem) {
  const authorId = r.author_detail?.id;
  const authorNuxtlink = r.author_detail?.nuxtlink || "";
  const authorSlug = authorNuxtlink.split("/").filter(Boolean).pop();

  if (authorId && authorSlug) {
    return `/author/${authorSlug}?id=${authorId}`;
  }

  return "#";
}

export function mapRelatedToEventCards(
  posts: EventHomePost[],
  limit = 3
): EventCard[] {
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
      placeHref: pickPlaceHref(r),
      title: r.title || "",
      subject: pickSubject(r),
      subjectHref: pickSubjectHref(r),
    }))
    .filter((x) => !!x.image && !!x.href && !!x.title)
    .slice(0, limit);
}