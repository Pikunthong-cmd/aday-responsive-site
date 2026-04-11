import HeroStatic from "@/components/layout/HeroStatic";
import SearchResultsSection from "@/components/ui/SearchResultsSection";
import { SearchAPI } from "@/src/api/search";

const PAGE_SIZE = 4;

export type SearchUIResult = {
  id: string | number;
  title: string;
  author?: string;
  cover?: string;
  url: string;
  categories: {
    name: string;
    url: string;
  }[];
};

function getText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (typeof value.rendered === "string") return value.rendered;
    if (typeof value.name === "string") return value.name;
  }
  return "";
}

function pickCover(it: any) {
  return (
    it?.featured_image?.sizes?.medium_large?.src ||
    it?.featured_image?.sizes?.large?.src ||
    it?.featured_image?.sizes?.medium?.src ||
    it?.featured_image?.sizes?.full?.src ||
    it?.featured_image?.src ||
    it?.cover ||
    it?.thumbnail ||
    it?.image ||
    ""
  );
}

function normalizeResults(data: any): SearchUIResult[] {
  const arr = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  return arr
    .map((it: any, idx: number) => {
      const categories = Array.isArray(it?.primary_category)
        ? it.primary_category
            .map((cat: any) => ({
              name: getText(cat?.name || cat),
              url: cat?.nuxtlink || "#",
            }))
            .filter((cat: { name: string; url: string }) => cat.name)
        : it?.category
          ? [
              {
                name: getText(it.category),
                url: it?.category?.nuxtlink || "#",
              },
            ]
          : [];

      return {
        id: it?.id ?? `${idx}`,
        title: getText(it?.title ?? it?.headline ?? it?.name),
        author: getText(it?.author_detail?.name ?? it?.author?.name ?? it?.author),
        cover: pickCover(it),
        url: it?.nuxtlink ?? it?.url ?? (it?.slug ? `/${it.slug}` : "#"),
        categories,
      };
    })
    .filter((item: SearchUIResult) => item.title);
}

export default async function SearchSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const keyword = decodeURIComponent(slug || "").trim();

  const initialData = keyword
    ? await SearchAPI.getAll(keyword, 1, PAGE_SIZE)
    : [];

  const initialItems = normalizeResults(initialData);

  return (
    <div className="bg-[#EFEEE7]">
      <HeroStatic
        variant="search"
        title="Search Results"
        desktopSrc="/images/bg-search-desktop.png"
        tabletSrc="/images/bg-search-tablet.png"
        mobileSrc="/images/bg-search-mobile.png"
      />

      <SearchResultsSection
        keyword={keyword}
        initialItems={initialItems}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}