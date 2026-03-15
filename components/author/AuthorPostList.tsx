// components/author/AuthorPostList.tsx
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
  if (typeof nuxtlink === "string" && nuxtlink.trim()) {
    const path = nuxtlink.startsWith("/") ? nuxtlink : `/${nuxtlink}`;
    return `/post${path}`;
  }

  const slug = post?.slug;
  if (typeof slug === "string" && slug.trim()) {
    return `/post/${slug}`;
  }

  const link = post?.link;
  if (typeof link === "string" && link.trim()) {
    const url = new URL(link);
    const path = url.pathname;
    return `/post${path}`;
  }

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

function getExcerpt(post: AnyPost) {
  const excerpt = stripHtml(post?.excerpt);
  if (excerpt) return excerpt;

  const content = stripHtml(post?.content);
  if (!content) return "";
  return content.slice(0, 120) + (content.length > 120 ? "..." : "");
}

function MetaRow({
  date,
  dark = false,
}: {
  date: string;
  dark?: boolean;
}) {
  return (
    <div className="mt-2 pt-2">
      <div
        className={[
          "mb-2 h-px w-[78%]",
          dark ? "bg-white/14" : "bg-black/10",
        ].join(" ")}
      />
      <div
        className={[
          "flex items-center justify-between text-[11px]",
          dark ? "text-white/82" : "text-black/70",
        ].join(" ")}
      >
        <span>{date}</span>
        <span className="font-medium">อ่านต่อ &gt;</span>
      </div>
    </div>
  );
}

function FeaturedCard({
  post,
  quote,
}: {
  post: AnyPost;
  quote: string;
}) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const description = getExcerpt(post);
  const image = getPostImage(post, 0);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);

  return (
    <article className="overflow-hidden border border-black/8 bg-[#E7E2D8]">
      <Link href={href} className="grid grid-cols-1 xl:grid-cols-[4fr_6fr_3fr]">
        <div className="relative aspect-[4/3] xl:aspect-auto xl:min-h-[228px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width:1280px) 28vw, 100vw"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between px-5 py-4 md:px-6 md:py-5">
          <div>
            <div className="mb-3 flex justify-end">
              <span className="inline-flex rounded-full bg-[#FE552C] px-4 py-2 text-[11px] font-semibold text-white">
                บทความแนะนำ
              </span>
            </div>

            {category ? (
              <p className="mb-2 text-[11px] font-semibold text-[#FE552C]">
                {category}
              </p>
            ) : null}

            <h3 className="line-clamp-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-black md:text-[24px]">
              {title}
            </h3>

            {description ? (
              <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-black/45">
                {description}
              </p>
            ) : null}
          </div>

          <MetaRow date={date} />
        </div>

        <div className="hidden border-l border-black/6 px-6 py-5 xl:flex xl:flex-col xl:justify-center">
          <div className="text-[34px] font-bold leading-none text-black/85">“</div>
          <p className="mt-3 whitespace-pre-line text-[14px] leading-6 text-black/42">
            {quote || "-"}
          </p>
        </div>
      </Link>
    </article>
  );
}

function TopWideCard({
  post,
  number,
}: {
  post: AnyPost;
  number: number;
}) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const image = getPostImage(post, number);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);
  const num = String(number).padStart(2, "0");

  return (
    <article className="group h-full overflow-hidden bg-[#251F16]">
      <Link href={href} className="block h-full">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[1.88/1] w-full overflow-hidden xl:h-[258px] xl:aspect-auto">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width:1280px) 66vw, 100vw"
            />
          </div>

          <div className="relative flex flex-1 flex-col px-4 pb-3 pt-3 text-white">
            {category ? (
              <p className="mb-2 text-[11px] font-semibold text-white/92">
                {category}
              </p>
            ) : (
              <div className="mb-2 h-[15px]" />
            )}

            <h3 className="line-clamp-2 pr-12 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]">
              {title}
            </h3>

            <div className="mt-auto">
              <MetaRow date={date} dark />
            </div>

            <div className="pointer-events-none absolute right-3 top-2 text-[50px] font-light leading-none tracking-[-0.04em] text-white/16">
              {num}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function TopOrangeCard({
  post,
  number,
}: {
  post: AnyPost;
  number: number;
}) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const image = getPostImage(post, number);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);
  const num = String(number).padStart(2, "0");

  return (
    <article className="group h-full overflow-hidden bg-[#FE552C]">
      <Link href={href} className="block h-full">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[1.64/1] w-full overflow-hidden xl:h-[258px] xl:aspect-auto">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width:1280px) 33vw, 100vw"
            />
          </div>

          <div className="relative flex flex-1 flex-col px-4 pb-3 pt-3 text-white">
            {category ? (
              <p className="mb-2 text-[11px] font-semibold text-white/92">
                {category}
              </p>
            ) : (
              <div className="mb-2 h-[15px]" />
            )}

            <h3 className="line-clamp-2 pr-12 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]">
              {title}
            </h3>

            <div className="mt-auto">
              <MetaRow date={date} dark />
            </div>

            <div className="pointer-events-none absolute right-3 top-2 text-[50px] font-light leading-none tracking-[-0.04em] text-white/16">
              {num}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function BottomCard({
  post,
  number,
  dark = false,
}: {
  post: AnyPost;
  number: number;
  dark?: boolean;
}) {
  const href = getPostHref(post);
  const title = stripHtml(post?.title) || "Untitled";
  const image = getPostImage(post, number);
  const category = getCategoryName(post);
  const date = formatDate(post?.date);
  const num = String(number).padStart(2, "0");

  return (
    <article className={`group h-full overflow-hidden ${dark ? "bg-[#251F16]" : "bg-[#D9D2C5]"}`}>
      <Link href={href} className="block h-full">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[1.62/1] w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
            />
          </div>

          <div className={`relative flex flex-1 flex-col px-4 pb-3 pt-3 ${dark ? "text-white" : "text-black"}`}>
            {category ? (
              <p className={`mb-2 text-[11px] font-semibold ${dark ? "text-white/92" : "text-[#FE552C]"}`}>
                {category}
              </p>
            ) : (
              <div className="mb-2 h-[15px]" />
            )}

            <h3 className="line-clamp-2 pr-12 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]">
              {title}
            </h3>

            <div className="mt-auto">
              <MetaRow date={date} dark={dark} />
            </div>

            <div className={`pointer-events-none absolute right-3 top-2 text-[50px] font-light leading-none tracking-[-0.04em] ${dark ? "text-white/16" : "text-black/14"}`}>
              {num}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Pagination({
  slug,
  authorId,
  activeCategory,
  currentPage,
  totalPages,
}: {
  slug: string;
  authorId: number;
  activeCategory: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-[3px]">
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(slug, authorId, currentPage - 1, activeCategory)}
          className="flex h-8 w-8 items-center justify-center border border-black/10 bg-[#E2DDD3] text-black/55 hover:bg-[#D8D2C7]"
        >
          ←
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="flex h-8 w-8 items-center justify-center border border-black/10 bg-[#E2DDD3] text-black/25"
        >
          ←
        </button>
      )}

      {pages.map((page) => {
        const active = page === currentPage;
        return (
          <Link
            key={page}
            href={buildPageHref(slug, authorId, page, activeCategory)}
            className={[
              "flex h-8 w-8 items-center justify-center border text-[12px] font-medium",
              active
                ? "border-[#FE552C] bg-[#FE552C] text-white"
                : "border-black/10 bg-[#E7E2D8] text-black hover:bg-[#DDD6CA]",
            ].join(" ")}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(slug, authorId, currentPage + 1, activeCategory)}
          className="flex h-8 w-8 items-center justify-center border border-black/10 bg-[#E7E2D8] text-black hover:bg-[#DDD6CA]"
        >
          →
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="flex h-8 w-8 items-center justify-center border border-black/10 bg-[#E7E2D8] text-black/25"
        >
          →
        </button>
      )}
    </div>
  );
}

type Props = {
  posts: AnyPost[];
  slug: string;
  authorId: number;
  categories: string[];
  activeCategory: string;
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  quote?: string;
  postsPerPage?: number;
};

export default function AuthorPostList({
  posts,
  slug,
  authorId,
  categories,
  activeCategory,
  currentPage,
  totalPages,
  totalFiltered,
  quote = "-",
  postsPerPage = 6,
}: Props) {
  const featured = posts[0];
  const second = posts[1];
  const third = posts[2];
  const fourth = posts[3];
  const fifth = posts[4];
  const sixth = posts[5];

  const baseIndex = (currentPage - 1) * postsPerPage;

  return (
    <section className="w-full bg-[#EFEEE7] [animation:authorFadeUp_.55s_ease-out_both]">
      <style>{`
        @keyframes authorFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="mb-4 flex flex-col gap-3 xl:mb-5 xl:flex-row xl:items-center xl:justify-between">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-[0.95] tracking-[-0.03em] text-black md:text-[24px] xl:text-[40px]">
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
                  "inline-flex h-[34px] items-center justify-center rounded-full border px-4 text-[12px] font-medium transition-transform duration-200 hover:-translate-y-[1px] md:h-[36px] md:px-5 md:text-[12px]",
                  active
                    ? "border-black bg-black text-white"
                    : "border-black/40 bg-white text-black hover:border-black",
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
            <div className="mb-[6px]">
              <FeaturedCard post={featured} quote={quote || "-"} />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-[6px] xl:grid-cols-12">
            {second ? (
              <div className="xl:col-span-8">
                <TopWideCard
                  post={second}
                  number={baseIndex + 2}
                />
              </div>
            ) : null}

            {third ? (
              <div className="xl:col-span-4">
                <TopOrangeCard
                  post={third}
                  number={baseIndex + 3}
                />
              </div>
            ) : null}

            {fourth ? (
              <div className="xl:col-span-4">
                <BottomCard post={fourth} number={baseIndex + 4} />
              </div>
            ) : null}

            {fifth ? (
              <div className="xl:col-span-4">
                <BottomCard post={fifth} number={baseIndex + 5} dark />
              </div>
            ) : null}

            {sixth ? (
              <div className="xl:col-span-4">
                <BottomCard post={sixth} number={baseIndex + 6} />
              </div>
            ) : null}
          </div>

          {totalFiltered > postsPerPage ? (
            <Pagination
              slug={slug}
              authorId={authorId}
              activeCategory={activeCategory}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          ) : null}
        </>
      )}
    </section>
  );
}