import { Metadata } from "next";
import ArtistTalkSection from "@/components/artist-talk/ArtistTalkSection";
import HeroCategory from "@/components/layout/HeroCategory";
import { categoryFeedAPI } from "@/src/api/category-feed";

type Params = { slug: string };
const PAGE_SIZE = 8;

const SLUG_MAP: Record<string, string> = {
  "q-and-a-day-interview": "q-and-a-day-interview",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apiSlug = SLUG_MAP[slug] ?? slug;
  const catRes = await categoryFeedAPI.getCategoryBySlug(apiSlug);
  const category = Array.isArray(catRes) ? catRes?.[0] : catRes;

  if (!category) return { title: "Category" };

  const yoast = category.yoast_head_json;

  return {
    title: yoast?.title || category.name,
    description: yoast?.description || `Articles in category ${category.name}`,
    openGraph: {
      title: yoast?.og_title || yoast?.title || category.name,
      description: yoast?.og_description || yoast?.description,
      images: yoast?.og_image?.map((img: any) => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })),
    },
  };
}

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
        categoryName = {categoryName}
      />
    </div>
  );
}
