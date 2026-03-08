import HeroStatic from "@/components/layout/HeroStatic";
import SearchResultsList from "@/components/SearchResultsList";

import { SearchAPI } from "@/src/api/search";

type UIResult = {
  id: string | number;
  title: string;
  category?: string;
  author?: string;
  cover?: string;
  url?: string;
};

function normalizeResults(data: any): UIResult[] {
  const arr = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  return arr
    .map((it: any, idx: number) => ({
      id: it?.id ?? it?._id ?? `${idx}`,
      title: it?.title ?? it?.name ?? it?.headline ?? "",
      category: it?.category?.name ?? it?.category ?? it?.section ?? "Wake Up",
      author: it?.author?.name ?? it?.author ?? "",
      cover:
        it?.cover ?? it?.thumbnail ?? it?.image ?? it?.featured_image ?? "",
      url:
        it?.url ?? (it?.slug ? `/${it.slug}` : it?.id ? `/post/${it.id}` : "#"),
    }))
    .filter((x: UIResult) => x.title);
}

export default async function SearchSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug || "").trim();
  const data = slug ? await SearchAPI.getAll(slug) : [];
  const items = normalizeResults(data);

  return (
    <div className="bg-white">
      <HeroStatic
  variant="search"
  title="Search Results"
  desktopSrc="/images/bg-search-desktop.png"
  tabletSrc="/images/bg-search-tablet.png"
  mobileSrc="/images/bg-search-mobile.png"
/>

      <SearchResultsList items={items} slug={slug} />
    </div>
  );
}
