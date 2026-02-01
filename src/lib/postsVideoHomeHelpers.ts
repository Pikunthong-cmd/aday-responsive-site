// src/lib/postsVideoHomeHelpers.ts

export type RelatedItem = {
  id: number;
  title?: string;
  nuxtlink?: string;
  link?: string;
  thumbnail?: string;
  featured_image?: {
    sizes?: {
      medium_large?: { src?: string };
      large?: { src?: string };
      full?: { src?: string };
      medium?: { src?: string };
      thumbnail?: { src?: string };
      [key: string]: { src?: string } | undefined;
    };
  };
};

export type VideoHomeApiPost = {
  id: number;
  related?: RelatedItem[];
};

export type VideoHomeCard = {
  id: number;
  title: string;
  href: string;
  image: string;
};

function pickRelatedImage(r: RelatedItem): string {
  const sizes = r.featured_image?.sizes;
  return (
    r.thumbnail ||
    sizes?.large?.src ||
    sizes?.medium_large?.src ||
    sizes?.full?.src ||
    sizes?.medium?.src ||
    sizes?.thumbnail?.src ||
    ""
  );
}

function pickHref(r: RelatedItem): string {
  return r.nuxtlink || r.link || "/";
}

export function mapRelatedToCards(
  posts: VideoHomeApiPost[],
  limit = 3
): VideoHomeCard[] {
  // 1) flatten related
  const relatedAll: RelatedItem[] = (posts || []).flatMap((p) => p.related || []);

  // 2) กันซ้ำด้วย id
  const seen = new Set<number>();
  const uniq = relatedAll.filter((r) => {
    if (!r?.id) return false;
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  // 3) map → card + filter ที่มีรูป
  const cards = uniq
    .map((r) => ({
      id: r.id,
      title: (r.title || "").trim(),
      href: pickHref(r),
      image: pickRelatedImage(r),
    }))
    .filter((c) => !!c.image);

  return cards.slice(0, limit);
}
