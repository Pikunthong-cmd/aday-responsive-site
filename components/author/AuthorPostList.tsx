import Image from "next/image";
import Link from "next/link";

type AnyPost = any;

function toText(input: any): string {
  if (typeof input === "string") return input;
  if (input && typeof input === "object" && "rendered" in input) {
    return typeof input.rendered === "string" ? input.rendered : "";
  }
  return "";
}

function stripHtml(input: any): string {
  return toText(input).replace(/<[^>]*>/g, "").trim();
}

function getPostHref(post: AnyPost) {
  const nuxtlink = post?.nuxtlink;
  if (typeof nuxtlink === "string" && nuxtlink.trim()) return nuxtlink;

  const slug = post?.slug;
  if (typeof slug === "string" && slug.trim()) return `/${slug}`;

  const link = post?.link;
  if (typeof link === "string" && link.trim()) return link;

  return "#";
}

function getPostImage(post: AnyPost, index: number) {
  const fallback =
    index % 3 === 0
      ? "/profile.svg"
      : index % 3 === 1
      ? "/profile-1.svg"
      : "/profile-2.svg";

  const src =
    post?.featured_image?.sizes?.large?.src ||
    post?.featured_image?.sizes?.medium_large?.src ||
    post?.featured_image?.sizes?.medium?.src ||
    post?.featured_image?.sizes?.full?.src ||
    post?.thumbnail;

  return typeof src === "string" && src.trim() ? src : fallback;
}

function getCategoryName(post: AnyPost) {
  const cat = Array.isArray(post?.primary_category) ? post.primary_category[0] : null;
  return typeof cat?.name === "string" ? cat.name : "";
}

function formatDate(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

function buildPageHref(
  slug: string,
  authorId: number,
  page: number,
  category?: string
) {
  const params = new URLSearchParams();
  params.set("id", String(authorId));
  params.set("page", String(page));
  if (category && category !== "ทั้งหมด") {
    params.set("category", category);
  }
  return `/author/${slug}?${params.toString()}`;
}

function buildCategoryHref(
  slug: string,
  authorId: number,
  category: string
) {
  const params = new URLSearchParams();
  params.set("id", String(authorId));
  if (category !== "ทั้งหมด") {
    params.set("category", category);
  }
  return `/author/${slug}?${params.toString()}`;
}

function FeaturedCard({ post }: { post: AnyPost }) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const description =
    stripHtml(post?.excerpt) ||
    stripHtml(post?.content)?.slice(0, 120) ||
    "";
  const image = getPostImage(post, 0);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);

  return (
    <article className="overflow-hidden border border-black/10 bg-[#E9E5DB]">
      <Link href={href} className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)_180px]">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 320px, 100vw"
          />
        </div>

        <div className="flex flex-col justify-between p-4 sm:p-5">
          <div>
            {category ? (
              <p className="mb-3 text-xs font-semibold text-[#FE552C]">{category}</p>
            ) : null}

            <h3 className="line-clamp-3 text-[24px] font-semibold leading-[1.2] text-black">
              {title}
            </h3>

            {description ? (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between text-[12px] text-black/70">
            <span>{date}</span>
            <span className="font-medium">อ่านต่อ &gt;</span>
          </div>
        </div>

        <div className="hidden items-center justify-center p-6 text-right lg:flex">
          <div>
            <div className="text-4xl font-bold leading-none text-black">“</div>
            <p className="mt-3 text-[13px] leading-6 text-black/45">
              หาไม่ได้ว่าดีกว่า
              <br />
              ก็คงไม่สามารถเริ่มต้นใหม่ได้
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function GridCard({ post, index }: { post: AnyPost; index: number }) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const image = getPostImage(post, index);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);
  const number = String(index + 2).padStart(2, "0");
  const highlighted = index === 1;

  return (
    <article
      className={[
        "group overflow-hidden",
        highlighted ? "bg-[#FE552C]" : "bg-[#D9D3C8]",
      ].join(" ")}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          />
        </div>

        <div
          className={[
            "relative min-h-[156px] p-4",
            highlighted ? "text-white" : "text-black",
          ].join(" ")}
        >
          {category ? (
            <p
              className={[
                "mb-3 text-xs font-semibold",
                highlighted ? "text-white/90" : "text-[#FE552C]",
              ].join(" ")}
            >
              {category}
            </p>
          ) : null}

          <h3 className="line-clamp-2 pr-10 text-[18px] font-semibold leading-[1.28]">
            {title}
          </h3>

          <div
            className={[
              "mt-6 flex items-center justify-between text-[12px]",
              highlighted ? "text-white/85" : "text-black/70",
            ].join(" ")}
          >
            <span>{date}</span>
            <span className="font-medium">อ่านต่อ &gt;</span>
          </div>

          <div
            className={[
              "pointer-events-none absolute right-3 top-3 text-[52px] font-light leading-none",
              highlighted ? "text-white/25" : "text-black/14",
            ].join(" ")}
          >
            {number}
          </div>
        </div>
      </Link>
    </article>
  );
}

type Props = {
  posts: AnyPost[];
  title?: string;
  slug: string;
  authorId: number;
  categories: string[];
  activeCategory: string;
  currentPage: number;
};

export default function AuthorPostList({
  posts,
  title = "บทความล่าสุด",
  slug,
  authorId,
  categories,
  activeCategory,
  currentPage,
}: Props) {
  const featured = posts[0];
  const rest = posts.slice(1, 6);

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-col gap-4 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[38px] font-bold leading-none tracking-[-0.03em] text-black">
          บทความ<span className="text-[#FE552C]">ล่าสุด</span>
        </h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <Link
                key={category}
                href={buildCategoryHref(slug, authorId, category)}
                className={[
                  "inline-flex min-h-10 items-center justify-center rounded-full border px-5 text-sm font-medium transition-colors",
                  active
                    ? "border-black bg-black text-white"
                    : "border-black/35 bg-white text-black hover:border-black",
                ].join(" ")}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white p-6 text-sm text-black/70">ยังไม่มีโพสต์</div>
      ) : (
        <>
          {featured ? (
            <div className="mb-4 lg:mb-5">
              <FeaturedCard post={featured} />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {rest.map((post, index) => (
              <GridCard key={post?.id ?? index} post={post} index={index} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled
              className="flex h-10 w-10 items-center justify-center bg-[#DDD8CF] text-black/35"
            >
              ←
            </button>

            {[1, 2, 3].map((page) => {
              const active = page === currentPage;
              return (
                <Link
                  key={page}
                  href={buildPageHref(slug, authorId, page, activeCategory)}
                  className={[
                    "flex h-10 w-10 items-center justify-center text-sm font-medium",
                    active
                      ? "bg-[#FE552C] text-white"
                      : "bg-[#E6E0D5] text-black hover:bg-[#DDD8CF]",
                  ].join(" ")}
                >
                  {page}
                </Link>
              );
            })}

            <Link
              href={buildPageHref(slug, authorId, currentPage + 1, activeCategory)}
              className="flex h-10 w-10 items-center justify-center bg-[#E6E0D5] text-black hover:bg-[#DDD8CF]"
            >
              →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}