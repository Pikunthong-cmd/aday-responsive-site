import AuthorHero from "@/components/author/AuthorHero";
import AuthorPostList from "@/components/author/AuthorPostList";
import { authorAPI } from "@/src/api/author";
import { getAuthorDetailFromPost } from "@/src/lib/author-detail";



const PER_PAGE = 6;

function toNumber(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string; page?: string; category?: string }>;
};

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;

  const authorId = toNumber(query.id);
  const page = toNumber(query.page) ?? 1;
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

  const res = await authorAPI.getById(authorId, page, PER_PAGE);

  const postsRaw =
    res?.posts ??
    res?.data?.posts ??
    res?.items ??
    res?.data?.items ??
    res ??
    [];

  const posts = Array.isArray(postsRaw) ? postsRaw : postsRaw ? [postsRaw] : [];
  const firstPost = posts[0];
  const author = getAuthorDetailFromPost(firstPost);

  const authorName = author?.name || slug || `Author ${authorId}`;
  const authorImage =
    firstPost?.author_image ||
    firstPost?.author_avatar ||
    "/profile.svg";

  const totalPosts =
    Number(res?.total) ||
    Number(res?.total_posts) ||
    Number(res?.data?.total) ||
    posts.length ||
    0;

  const categorySet = new Set<string>();
  posts.forEach((post: any) => {
    const cats = Array.isArray(post?.primary_category) ? post.primary_category : [];
    cats.forEach((cat: any) => {
      if (typeof cat?.name === "string" && cat.name.trim()) {
        categorySet.add(cat.name.trim());
      }
    });
  });

  const categories = ["ทั้งหมด", ...Array.from(categorySet)];

  const filteredPosts =
    activeCategory === "ทั้งหมด"
      ? posts
      : posts.filter(
          (post: any) =>
            Array.isArray(post?.primary_category) &&
            post.primary_category.some((cat: any) => cat?.name === activeCategory)
        );

  return (
    <div className="bg-[#EFEEE7]">
      <AuthorHero
        title={authorName}
        imageSrc={authorImage}
        role="WRITER"
        bio=""
        totalPosts={totalPosts}
        since="2016"
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-6 md:px-6 md:pb-14 lg:px-8">
        <AuthorPostList
          posts={filteredPosts}
          title="บทความล่าสุด"
          slug={slug}
          authorId={authorId}
          categories={categories}
          activeCategory={activeCategory}
          currentPage={page}
        />
      </div>
    </div>
  );
}