import { AUTHOR_META, DEFAULT_AUTHOR_META } from "./author";


type AnyPost = any;

export function getAuthorSlugFromNuxtlink(nuxtlink?: string): string {
  if (!nuxtlink || typeof nuxtlink !== "string") return "";
  const match = nuxtlink.match(/\/author\/([^/]+)\/?$/);
  return match?.[1] ?? "";
}

export function getAuthorDetailFromPost(post: AnyPost) {
  const author = post?.author_detail;

  if (!author || typeof author !== "object") {
    return {
      id: "",
      name: "",
      url: "",
      nuxtlink: "",
      slug: "",
    };
  }

  const nuxtlink =
    typeof author?.nuxtlink === "string" ? author.nuxtlink : "";

  return {
    id: author?.id ?? "",
    name: typeof author?.name === "string" ? author.name : "",
    url: typeof author?.url === "string" ? author.url : "",
    nuxtlink,
    slug: getAuthorSlugFromNuxtlink(nuxtlink),
  };
}

export function getAuthorMeta(slug: string) {
  return AUTHOR_META[slug] ?? DEFAULT_AUTHOR_META;
}

export function getAuthorSince(posts: AnyPost[], fallback = "") {
  const years = posts
    .map((post) => {
      const date = new Date(post?.date);
      return Number.isNaN(date.getTime()) ? null : date.getFullYear();
    })
    .filter((year): year is number => typeof year === "number");

  if (!years.length) return fallback;
  return String(Math.min(...years));
}

export function getAuthorTotalPosts(posts: AnyPost[]) {
  return Array.isArray(posts) ? posts.length : 0;
}

export function getAuthorCategories(posts: AnyPost[]) {
  const set = new Set<string>();

  posts.forEach((post) => {
    const cats = Array.isArray(post?.primary_category)
      ? post.primary_category
      : [];

    cats.forEach((cat: any) => {
      if (typeof cat?.name === "string" && cat.name.trim()) {
        set.add(cat.name.trim());
      }
    });
  });

  return ["ทั้งหมด", ...Array.from(set)];
}

export function filterPostsByCategory(posts: AnyPost[], activeCategory: string) {
  if (activeCategory === "ทั้งหมด") return posts;

  return posts.filter(
    (post) =>
      Array.isArray(post?.primary_category) &&
      post.primary_category.some((cat: any) => cat?.name === activeCategory)
  );
}