import Image from "next/image";
import Link from "next/link";

type AnyPost = any;

type RenderedField = { rendered?: unknown } | string | null | undefined;

function toText(input: RenderedField): string {
  if (typeof input === "string") return input;
  if (input && typeof input === "object" && "rendered" in input) {
    const r = (input as any).rendered;
    return typeof r === "string" ? r : "";
  }
  return "";
}

function stripHtml(input: RenderedField): string {
  const html = toText(input);
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function getPostHref(post: AnyPost) {
  const nuxtlink = post?.nuxtlink;
  if (typeof nuxtlink === "string" && nuxtlink.length > 0) return nuxtlink;

  const link = post?.link;
  if (typeof link === "string" && link.length > 0) return link;

  const slug = post?.slug;
  if (typeof slug === "string" && slug.length > 0) return `/posts/${slug}`;

  return "#";
}

function getCover(post: AnyPost, index: number) {
  const fallback =
    index % 3 === 0
      ? "/podcast.svg"
      : index % 3 === 1
        ? "/podcast-1.svg"
        : "/podcast-2.svg";

  const fromApi =
    post?.featured_image?.sizes?.full?.src ||
    post?.featured_image?.sizes?.large?.src ||
    post?.featured_image?.sizes?.medium_large?.src ||
    post?.featured_image?.sizes?.medium?.src ||
    post?.mobile_image?.sizes?.full?.src ||
    post?.mobile_image?.sizes?.large?.src ||
    post?.thumbnail;

  return typeof fromApi === "string" && fromApi.length > 0 ? fromApi : fallback;
}

function getHostName(post: AnyPost): string {
  const fromAcf =
    post?.acf?.host ||
    post?.acf?.host_name ||
    post?.acf?.podcast_host ||
    post?.host;

  if (typeof fromAcf === "string" && fromAcf.trim()) return fromAcf.trim();

  const fromAuthor = post?.author_detail?.name;
  if (typeof fromAuthor === "string" && fromAuthor.trim())
    return fromAuthor.trim();

  return "";
}

function getHostHref(post: AnyPost): string {
  const href =
    post?.author_detail?.url ||
    post?.author_detail?.nuxtlink ||
    post?.host_url ||
    post?.host_link;

  return typeof href === "string" ? href : "";
}

function PostCard({ post, index }: { post: AnyPost; index: number }) {
  const title = stripHtml(post?.title) || "Untitled";
  const hostName = getHostName(post);
  const hostHref = getHostHref(post);

  const cover = getCover(post, index);
  const href = getPostHref(post);

  return (
    <article className="group overflow-hidden shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        {/* image */}
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

        <Link href={href} aria-label={title} className="absolute inset-0 z-[2]">
          <span className="sr-only">{title}</span>
        </Link>

        <div className="pointer-events-none absolute bottom-0 left-0 z-[3] w-full p-4 md:p-5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white md:text-xl">
            {title}
          </h3>

          {hostName ? (
            <div className="mt-1 line-clamp-1 text-sm md:text-base">
              <span className="text-[#FE552C]">Host : </span>

              {hostHref ? (
                
                <Link
                  href={hostHref}
                  className="pointer-events-auto relative z-[4] text-[#FE552C] transition-colors duration-300 hover:text-white"
                >
                  {hostName}
                </Link>
              ) : (
                <span className="text-[#FE552C]">{hostName}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function PodcastSection({
  posts,
  title = "Podcast",
  limit,
}: {
  posts: AnyPost[];
  title?: string;
  limit?: number;
}) {
  const safePosts = Array.isArray(posts) ? posts : [];
  const displayPosts = typeof limit === "number" ? safePosts.slice(0, limit) : safePosts;

  return (
    <section className="w-full py-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="h1 text-lg font-bold md:text-xl">{title}</h2>
      </div>

      {displayPosts.length === 0 ? (
        <div className="border-black/10 bg-white p-6 text-sm text-black/70">
          ยังไม่มีรายการในหมวดนี้
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {displayPosts.map((p, idx) => (
            <PostCard key={p?.id ?? `${idx}`} post={p} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
