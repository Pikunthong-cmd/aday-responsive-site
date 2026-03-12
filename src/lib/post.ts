export type AnyPost = any;

export function stripHtml(input?: string | { rendered?: string } | null): string {
  const html =
    typeof input === "string"
      ? input
      : typeof input?.rendered === "string"
      ? input.rendered
      : "";

  return html.replace(/<[^>]*>/g, "").trim();
}

export function getPostTitle(post: AnyPost): string {
  return stripHtml(post?.title) || "Untitled";
}

export function getPostHref(post: AnyPost): string {
  const nuxtlink = post?.nuxtlink;
  if (typeof nuxtlink === "string" && nuxtlink.trim()) return nuxtlink;

  const slug = post?.slug;
  if (typeof slug === "string" && slug.trim()) return `/${slug}`;

  const link = post?.link;
  if (typeof link === "string" && link.trim()) return link;

  return "#";
}

export function getPostImage(post: AnyPost, fallback = "/profile.svg"): string {
  return (
    post?.featured_image?.sizes?.large?.src ||
    post?.featured_image?.sizes?.medium_large?.src ||
    post?.featured_image?.sizes?.medium?.src ||
    post?.featured_image?.sizes?.full?.src ||
    post?.thumbnail ||
    fallback
  );
}

export function getPostDate(post: AnyPost): string {
  const raw = post?.date;
  if (!raw) return "";

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day} / ${month} / ${year}`;
}

export function getPrimaryCategory(post: AnyPost) {
  return Array.isArray(post?.primary_category) ? post.primary_category[0] : null;
}