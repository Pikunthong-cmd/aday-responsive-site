// app/author/[slug]/page.tsx
import AuthorHero from "@/components/author/AuthorHero";
import AuthorPostList from "@/components/author/AuthorPostList";
import { authorAPI } from "@/src/api/author";
import {
  filterPostsByCategory,
  getAuthorCategories,
  getAuthorDetailFromPost,
  getAuthorSince,
  getAuthorTotalPosts,
} from "@/src/lib/author-page";

const POSTS_PER_PAGE = 6;

function toNumber(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    id?: string;
    page?: string;
    category?: string;
  }>;
};

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;

  const authorId = toNumber(query.id);
  const currentPage = toNumber(query.page) ?? 1;
  const activeCategory = query.category ?? "ทั้งหมด";

  if (!authorId) {
    return (
      <div className="bg-[#EFEEE7]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
          <div className="bg-white p-6 text-sm text-black/70">
            ไม่พบ author id สำหรับ slug: {slug}
          </div>
        </div>
      </div>
    );
  }

  const [postsRes, usersRes] = await Promise.all([
    authorAPI.getById(authorId, 1, 100),
    authorAPI.getUserBySlug(slug),
  ]);

  const postsRaw =
    postsRes?.posts ??
    postsRes?.data?.posts ??
    postsRes?.items ??
    postsRes?.data?.items ??
    postsRes ??
    [];

  const allPosts = Array.isArray(postsRaw) ? postsRaw : postsRaw ? [postsRaw] : [];
  const firstPost = allPosts[0];
  const authorFromPost = getAuthorDetailFromPost(firstPost);

  const user = Array.isArray(usersRes) ? usersRes[0] ?? null : usersRes ?? null;

  const authorName =
    user?.name ||
    authorFromPost?.name ||
    slug ||
    `Author ${authorId}`;

  const heroImage =
    user?.avatar_urls?.["128"] ||
    user?.avatar_urls?.["96"] ||
    user?.yoast_head_json?.og_image?.[0]?.url ||
    "/profile.svg";

  const heroBio =
    user?.description ||
    "";

  const totalPosts =
    Number(user?.post_count) ||
    Number(postsRes?.total) ||
    Number(postsRes?.total_posts) ||
    Number(postsRes?.data?.total) ||
    getAuthorTotalPosts(allPosts);

  const since = getAuthorSince(allPosts, "");
  const categories = getAuthorCategories(allPosts);

  const filteredPosts = filterPostsByCategory(allPosts, activeCategory);
  const totalFiltered = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / POSTS_PER_PAGE));

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const pagedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="bg-[#EFEEE7]">
      <AuthorHero
        title={authorName}
        imageSrc={heroImage}
        role="WRITER"
        bio={heroBio}
        totalPosts={totalPosts}
        since={since}
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-6 md:px-6 md:pb-14 lg:px-8">
        <AuthorPostList
          posts={pagedPosts}
          slug={slug}
          authorId={authorId}
          categories={categories}
          activeCategory={activeCategory}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          totalFiltered={totalFiltered}
          quote="-"
          postsPerPage={POSTS_PER_PAGE}
        />
      </div>
    </div>
  );
}