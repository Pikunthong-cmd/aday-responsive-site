export type EventCardCategory = {
  id: number;
  name: string;
  nuxtlink?: string;
  nicename?: string;
};

export type EventCard = {
  id: number;
  title: string;
  href: string;
  image: string;
  subject?: string;
  subjectHref?: string;
  category?: EventCardCategory[];
};

export type EventTag = {
  id: number;
  name?: string;
  slug?: string;
};

export type EventRelatedPost = {
  id: number;
  date?: string;
  title: string;
  thumbnail?: string;
  link?: string;
  nuxtlink?: string;

  excerpt?: {
    rendered?: string;
  };

  primary_category?: EventCardCategory[];
  category?: EventCardCategory[];

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
};

export type EventHomePost = {
  id: number;

  title?: {
    rendered?: string;
  };

  related?: EventRelatedPost[];
};

function cleanTitle(title: string) {
  return title
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&amp;/g, "&")
    .trim();
}

function pickRelatedImage(item: EventRelatedPost) {
  return (
    item.thumbnail ||
    item.featured_image?.sizes?.large?.src ||
    item.featured_image?.sizes?.medium_large?.src ||
    item.featured_image?.sizes?.full?.src ||
    item.featured_image?.sizes?.medium?.src ||
    item.featured_image?.sizes?.thumbnail?.src ||
    ""
  );
}

function pickRelatedHref(item: EventRelatedPost) {
  return item.nuxtlink || item.link || "#";
}

function pickRelatedCategory(item: EventRelatedPost) {
  return item.category || item.primary_category || [];
}

export function mapRelatedToEventCards(
  items: EventRelatedPost[],
  limit = 3,
): EventCard[] {
  return items.slice(0, limit).map((item) => ({
    id: item.id,
    title: cleanTitle(item.title || ""),
    href: pickRelatedHref(item),
    image: pickRelatedImage(item),
    category: pickRelatedCategory(item),
  }));
}