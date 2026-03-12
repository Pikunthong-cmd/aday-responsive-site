type AnyPost = any;

export type AuthorDetail = {
  id?: number | string;
  name?: string;
  url?: string;
  nuxtlink?: string;
};

export function getAuthorDetailFromPost(post: AnyPost): AuthorDetail | null {
  const author = post?.author_detail;

  if (!author || typeof author !== "object") return null;

  return {
    id: author?.id,
    name: typeof author?.name === "string" ? author.name.trim() : "",
    url: typeof author?.url === "string" ? author.url : "",
    nuxtlink: typeof author?.nuxtlink === "string" ? author.nuxtlink : "",
  };
}

export function getAuthorSlugFromDetail(author: AuthorDetail | null): string {
  if (!author?.nuxtlink) return "";

  const match = author.nuxtlink.match(/\/author\/([^/]+)\/?$/);
  return match?.[1] ?? "";
}

export function getAuthorHrefFromDetail(author: AuthorDetail | null): string {
  if (!author) return "#";

  const slug = getAuthorSlugFromDetail(author);
  const hasId =
    author.id !== undefined &&
    author.id !== null &&
    String(author.id).trim().length > 0;

  if (slug && hasId) return `/author/${slug}?id=${author.id}`;
  if (slug) return `/author/${slug}`;
  if (hasId) return `/author/${author.id}?id=${author.id}`;

  return "#";
}