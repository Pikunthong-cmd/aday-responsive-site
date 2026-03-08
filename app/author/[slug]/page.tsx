import AuthorHero from "@/components/author/AuthorHero";
import AuthorList from "@/components/author/AuthorPostList";

import { authorAPI } from "@/src/api/author";

const PER_PAGE = 12;

function toNumber(value: string | string[] | undefined) {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default async function AuthorPage({
  searchParams,
}: {
  searchParams: { id?: string; page?: string };
}) {
  const authorId = toNumber(searchParams.id);
  const page = toNumber(searchParams.page) ?? 1;

  if (!authorId) {
    return (
      <div className="bg-[#EFEEE7]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
          <div className="bg-white p-6 text-sm text-black/70">
            ไม่พบ author id (ต้องเข้าแบบ /author?id=123)
          </div>
        </div>
      </div>
    );
  }

  const res = await authorAPI.getCategoriesById(authorId, page, PER_PAGE);

  const author = res?.author ?? res?.data?.author ?? res?.data ?? res ?? null;
  const authorName = author?.name ?? `Author ${authorId}`;

  const postsRaw = res?.posts ?? res?.data?.posts ?? res?.items ?? res?.data?.items ?? [];
  const posts = Array.isArray(postsRaw) ? postsRaw : postsRaw ? [postsRaw] : [];

  return (
    <div className="bg-[#EFEEE7]">
      <AuthorHero
        title={authorName}
        desktopSrc="/bg-other-desktop.png"
        tabletSrc="/bg-other-tablet.png"
        mobileSrc="/bg-other-mobile.png"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 md:px-6 md:pb-14">
        <AuthorList posts={posts} title="All posts" />
      </div>
    </div>
  );
}