import ArtistTalkSection from "@/components/artist-talk/ArtistTalkSection";
import HeroCategory from "@/components/layout/HeroCategory";
import { categoryFeedAPI } from "@/src/api/category-feed";

type Params = { slug: string };
const PAGE_SIZE = 8;

const SLUG_MAP: Record<string, string> = {
  "artist-talk": "artist-talk",
  "draft-till-done": "draft-till-done",
  "what-a-day": "what-a-day",
  "portfolio": "portfolio",
  "behind-the-%e0%b8%a8%e0%b8%b4%e0%b8%a5%e0%b8%9b%e0%b9%8c":
    "behind-the-%e0%b8%a8%e0%b8%b4%e0%b8%a5%e0%b8%9b%e0%b9%8c",
  "outstallation-art": "outstallation-art",
};

export default async function CreativeCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug: routeSlug } = await params;

  const apiSlug = SLUG_MAP[routeSlug] ?? routeSlug;

  const catRes = await categoryFeedAPI.getCategoryBySlug(apiSlug);
  const category = Array.isArray(catRes) ? catRes?.[0] : catRes;

  const categoryId: number | null = category?.id ?? null;

  const categoryName: string = (category?.name ?? apiSlug).toUpperCase();

  const heroImg: string =
    category?.column_image?.sizes?.full?.src ?? "/images/artist-talk/hero.png";

  const initialPosts = categoryId
    ? await categoryFeedAPI.getPostsByCategoryId(categoryId, 0, PAGE_SIZE)
    : null;

  return (
    <div className="bg-[#EFEEE7]">
      <HeroCategory imageSrc={heroImg} title={categoryName} />

      <ArtistTalkSection
        artistTalkId={categoryId}
        categoriesRes={initialPosts}
        initialOffset={0}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
