type AnyPost = any;

export type AuthorDetail = {
  id?: number | string;
  name?: string;
  url?: string;
  nuxtlink?: string;
};

export function getAuthorDetail(post: AnyPost): AuthorDetail | null {
  const author = post?.author_detail;

  if (!author || typeof author !== "object") return null;

  return {
    id: author?.id,
    name: typeof author?.name === "string" ? author.name.trim() : "",
    url: typeof author?.url === "string" ? author.url : "",
    nuxtlink: typeof author?.nuxtlink === "string" ? author.nuxtlink : "",
  };
}

export function getAuthorSlug(author: AuthorDetail | null): string {
  if (!author?.nuxtlink) return "";

  const match = author.nuxtlink.match(/\/author\/([^/]+)\/?$/);
  return match?.[1] ?? "";
}

export function getAuthorHref(author: AuthorDetail | null): string {
  if (!author) return "#";

  const slug = getAuthorSlug(author);
  const hasId =
    author.id !== undefined &&
    author.id !== null &&
    String(author.id).trim().length > 0;

  if (slug && hasId) {
    return `/author/${slug}?id=${author.id}`;
  }

  if (slug) {
    return `/author/${slug}`;
  }

  if (hasId) {
    return `/author/${author.id}?id=${author.id}`;
  }

  return "#";
}

export function getAuthorName(post: AnyPost): string {
  const author = getAuthorDetail(post);
  if (author?.name) return author.name;

  const fallback =
    post?.acf?.host ||
    post?.acf?.host_name ||
    post?.acf?.podcast_host ||
    post?.host;

  return typeof fallback === "string" ? fallback.trim() : "";
}