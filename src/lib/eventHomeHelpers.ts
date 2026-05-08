export type EventTag = {
  id: number;
  name: string;
  slug?: string;
};

export type EventCategory = {
  id: number;
  name: string;
  nuxtlink: string;
};

export type EventPost = {
  id: number;
  title?: string | { rendered?: string };
  thumbnail?: string;
  link?: string;
  nuxtlink?: string;
  featured_image?: {
    sizes?: {
      thumbnail?: {
        src?: string;
      };
      medium?: {
        src?: string;
      };
      medium_large?: {
        src?: string;
      };
      large?: {
        src?: string;
      };
      full?: {
        src?: string;
      };
    };
  };
  opengraph_image?: {
    url?: string;
  };
  author_detail?: {
    id?: number | string;
    name?: string;
    nuxtlink?: string;
  };
  primary_category?: Array<{
    id?: number;
    nicename?: string;
    name?: string;
    nuxtlink?: string;
  }>;
  category?: EventCategory[];
  data?: {
    categories?: EventCategory[];
  };
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
  category: EventCategory[];
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

function pickHref(post: EventPost) {
  return post.nuxtlink || post.link || "/";
}

function pickImage(post: EventPost) {
  return (
    post.thumbnail ||
    post.featured_image?.sizes?.full?.src ||
    post.featured_image?.sizes?.large?.src ||
    post.featured_image?.sizes?.medium_large?.src ||
    post.featured_image?.sizes?.medium?.src ||
    post.featured_image?.sizes?.thumbnail?.src ||
    post.opengraph_image?.url ||
    ""
  );
}

function pickTitle(post: EventPost) {
  if (typeof post.title === "string") {
    return post.title;
  }

  return post.title?.rendered || "";
}

function pickPlace(post: EventPost) {
  return (
    post.primary_category?.[0]?.nicename ||
    post.primary_category?.[0]?.name ||
    ""
  );
}

function pickPlaceHref(post: EventPost) {
  return post.primary_category?.[0]?.nuxtlink || "#";
}

function pickSubject(post: EventPost) {
  return post.author_detail?.name || "";
}

function pickSubjectHref(post: EventPost) {
  const authorId = post.author_detail?.id;
  const authorNuxtlink = post.author_detail?.nuxtlink || "";
  const authorSlug = authorNuxtlink.split("/").filter(Boolean).pop();

  if (authorId && authorSlug) {
    return `/author/${authorSlug}?id=${authorId}`;
  }

  return "#";
}

function pickCategory(post: EventPost): EventCategory[] {
  const categories = post.data?.categories || post.category || [];

  return Array.isArray(categories)
    ? categories.map((c) => ({
        id: c.id,
        name: c.name,
        nuxtlink: c.nuxtlink,
      }))
    : [];
}

export function mapPostsToEventCards(
  posts: EventPost[],
  limit = 3
): EventCard[] {
  const seen = new Set<number>();

  return (posts || [])
    .filter((post) => {
      if (!post?.id) return false;
      if (seen.has(post.id)) return false;

      seen.add(post.id);
      return true;
    })
    .map((post): EventCard => ({
      id: post.id,
      href: pickHref(post),
      image: pickImage(post),
      place: pickPlace(post),
      placeHref: pickPlaceHref(post),
      title: pickTitle(post),
      subject: pickSubject(post),
      subjectHref: pickSubjectHref(post),
      category: pickCategory(post),
    }))
    .filter((item) => !!item.image && !!item.href && !!item.title)
    .slice(0, limit);
}